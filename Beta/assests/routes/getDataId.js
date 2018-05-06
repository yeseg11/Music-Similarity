(function($) {
    $(document).ready(function() {

        var musicWrapper = $('#musicWrapper');

        var template  = '<div class="wrap-input100 input100-select">';
        template += '<span id="::videoId:::" class="label-input100"></span>';
        template += '<div id="demo"></div>';
        template += '<span class="focus-input100">::name::</span>';
        template += '<iframe width="560" height="315" src="http://www.youtube.com/embed/::link::"></iframe>';
        template += '<div id = "buttons">';
        template += '<button class="buttonDes" type="button"  onclick="f2(\'::userid::\',\'::data::\',0)" name="like" id ="like"><img src="../images/btn/check-mark.png" name="like"/></button>';
        template += '<button class="buttonDes" type="button" onclick="f2(\'::userid::\',\'::data::\',1)" name="unlike"><img src="../images/btn/cancel-music.png" name="unlike"/></button>';
        template += '</div>';
        template += '</div>';
        //template += '<div id="load">';
        //template += '<button class="buttonDes" type="load" name="load">load more</button>';
        //template += '</div>';
        // $('#like').on("click", function(e) {
        //      e.preventDefault();
        //      alert("like");
        //  });

        // $("#like").click(function(e) {
        //     e.preventDefault();
        //     console.log("Showing");
        // });
        // $('#unlike').on("click", function(e) {
        //     alert("unlike");
        // });


        $('#send').on("click", function(e) {
            if( $('#id').length)         // use this if you are using id to check
            {
                var id = $('#id');
                //console.log(id.val().toString());
            }
            else{
                return $('#error').text("insert id!");
            }
            $.get('/user/' + id.val().toString(), function(data) {
                if(!data || !data.items || !data.items.length) return musicWrapper.html('<h3>Please rephrase search</h3>');
                //console.log(data);
                var year = data.items[0].year;
                var country = data.items[0].country;
                 musicWrapper.html('<h3><i class="fa fa-spinner fa-spin fa-3x fa-fw"></i> Loading</h3>');
                //console.log(data.items[0].group);
                $.get('/playList/' + data.items[0].group.toString(), function(data) {
                    //console.log(data);
                    if(!data || !data.items || !data.items.length) return musicWrapper.html('<h3>Please rephrase search</h3>');
                    var rec = data.items[0].records;
                    var html = '';
                    for (var i = 0; i < Object.keys(rec).length; i++) {
                        //console.log(rec[i]);
                        var item = rec[i];
                        //console.log(item);
                        var mbid = (item && item.mbid) ? item.mbid : '';
                        var videoId = (item && item.youtube && item.youtube.videoId) ? item.youtube.videoId : '';
                        //console.log(videoId);
                        var title = (item && item.title)? item.title: '';
                        var artist = (item && item.artist && item.artist[0] && item.artist[0].name)? item.artist[0].name : '';
                        html += template.replace('::videoId::', videoId).replace('::name::', title + ' - ' + artist).replace('::link::',videoId).replace('::userid::',id.val().toString()).replace('::data::',mbid);
                        html = html.replace('::userid::',id.val().toString()).replace('::data::',mbid);
                    }
                    $('#title').html("Your Music: "+year + ',' + country);
                    window.scrollBy(0, 500);
                    musicWrapper.html(html);
                });
            });
        });


    });
})(jQuery);

function f2(id,mbid,n) {
    alert("mbid: "+mbid +" UserId: "+id +", like = 0 unlike=1: "+n);
    $.get('/user/' + id.toString(), function(data) {
        //console.log(data.items);
        //console.log(data.items[0].likes);
        if (!data.items ){
            return Error;
        }
        if(n == 0){                //like
            var likes =[];
            if (data.items[0].likes.length == 0){
                likes =  [{mbid:mbid}];
            }
            else {
                likes=data.items[0].likes;
                for(var i =0 ;i<likes.length;i++)
                {
                    if(likes[i].mbid == mbid){
                        console.log('find');
                        alert('you like it before');
                        return;
                    }
                }
                likes.push({mbid:mbid});
            }
            //console.log(likes);
            var obj =  {
                id: id.toString(),
                likes: JSON.stringify(likes)
            };
            var $form = $( this );
            //console.log($form);
            var url = $form.attr("action");
            url= "like/"+id.toString();
            var posting = $.post(url,obj);
            //console.log("url: "+url);
            posting.done(function(data) {
                //console.log("data:"+data);
            });
        }
        else {      //unlike
            var unlike =[];
            if (data.items[0].unlike.length == 0){
                unlike = [{mbid:mbid}];
            }
            else {
                unlike=data.items[0].unlike;
                for(var i =0 ;i<unlike.length;i++)
                {
                    if(unlike[i].mbid == mbid){
                        console.log('find');
                        alert('you like it before');
                        return;
                    }
                }
                unlike.push({mbid:mbid});
            }
            //console.log(likes);
            var obj =  {
                id: id.toString(),
                unlike: JSON.stringify(unlike)
            };
            var $form = $( this );
            //console.log($form);
            var url = $form.attr("action");
            url= "unlike/"+id.toString();
            var posting = $.post(url,obj);
            //console.log("url: "+url);
            posting.done(function(data) {
                //console.log("data:"+data);
            });
        }

    });
}
