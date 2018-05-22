(function($) {
    $(document).ready(function() {

        var musicWrapper = $('#musicWrapper');

        var template  = '<div class="wrap-input100 input100-select">';
        template += '<span id="::videoId:::" class="label-input100"></span>';
        template += '<div id="demo"></div>';
        template += '<span class="focus-input100">::name::</span>';
        template += '<iframe width="560" height="315" src="http://www.youtube.com/embed/::link::"></iframe>';
        template += '<div id = "buttons">';
        template += '<button class="buttonDes" type="button" onclick="f2(\'::userid::\',\'::data::\',1)" name="like" id ="like"><img src="../images/btn/1.png" name="like"/></button>';
        template += '<button class="buttonDes" type="button" onclick="f2(\'::userid::\',\'::data::\',2)" name="like" id ="like"><img src="../images/btn/2.png" name="like"/></button>';
        template += '<button class="buttonDes" type="button" onclick="f2(\'::userid::\',\'::data::\',3)" name="like" id ="like"><img src="../images/btn/3.png" name="like"/></button>';
        template += '<button class="buttonDes" type="button" onclick="f2(\'::userid::\',\'::data::\',4)" name="like" id ="like"><img src="../images/btn/4.png" name="like"/></button>';
        template += '<button class="buttonDes" type="button" onclick="f2(\'::userid::\',\'::data::\',5)" name="like" id ="like"><img src="../images/btn/5.png" name="like"/></button>';
        template += '';
        template += '</div>';
        template += '</div>';



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
                var playListName = data.items[0].group.toString();
                $.get('/playList/' + playListName, function(data) {
                    //console.log(data);
                    if(!data || !data.items || !data.items.length) return musicWrapper.html('<h3>Please rephrase search</h3>');
                    var rec = data.items[0].records;
                    var html = '';
                    var playarr =[];
                    var i,j = 0;
                    var flag1,flag2 = true;
                    var s =  Object.keys(rec).length/2;
                    for (i=0 ;i < s ; i++ ){
                        flag2 = true;
                        while (flag2){
                            flag1 = true;
                            var k = Math.floor((Math.random() * 20));
                            //console.log(k);
                            for (j = 0 ; j < i;j++)
                                    {
                                        if(playarr[j] == k){
                                            flag1 = false;
                                        }
                                    }
                            if(flag1)
                            {
                                playarr[i]=k;
                                flag2 = false;
                            }
                        }
                    }
                    //console.log(playarr);
                    for (i = 0; i < playarr.length; i++) {
                        var place = playarr[i];
                        var item = rec[place];
                        //console.log(item);
                        var mbid = (item && item.mbid) ? item.mbid : '';
                        var videoId = (item && item.youtube && item.youtube.videoId) ? item.youtube.videoId : '';
                        //console.log(videoId);
                        var title = (item && item.title)? item.title: '';
                        var artist = (item && item.artist && item.artist[0] && item.artist[0].name)? item.artist[0].name : '';
                        html += template.replace('::videoId::', videoId).replace('::name::', title + ' - ' + artist).replace('::link::',videoId).replace('::userid::',id.val().toString()).replace('::data::',mbid);
                        html = html.replace(new RegExp ('::userid::','g'),id.val().toString()).replace(new RegExp('::data::','g'),mbid);
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
    $.get('/user/' + id.toString(), function(data) {
        //console.log(data.items);
        //console.log(data.items[0].likes);
        if (!data.items ){
            return Error;
        }
        var songs = [];
        var selection = n;
        var f = false;
        if (data.items[0].songs.length == 0){
            songs =  [{
                mbid:mbid,
                counter:selection
            }];
        }
        else {
            songs=data.items[0].songs;
            for(var i =0 ;i<songs.length;i++)
            {
                if(songs[i].mbid == mbid){
                    f= true;
                    songs[i].counter = selection;
                    alert("mbid: "+mbid +" likes counter: "+songs[i].counter);
                    }
            }
            if(!f){
                songs.push({
                    mbid:mbid,
                    counter: selection
                });
            }
        }
        var obj =  {
            id: id.toString(),
            songs: JSON.stringify(songs)
        };
        var $form = $( this );
        //console.log($form);
        var url = $form.attr("action");
        url= "selection/"+id.toString();
        var posting = $.post(url,obj);
        //console.log("url: "+url);
        alert("vote add");
        posting.done(function(data) {
            //console.log("data:"+data);
        });
    });
}

function getBest(id,playlist) {
    console.log(id +" "+playlist);
    $.get('/selection/' + id+'/'+playlist, function(data) {
        //console.log("DATA",data);
    });
}