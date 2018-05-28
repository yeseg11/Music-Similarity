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



        var experienceShow  = '<div class="wrap-input100 input100-select">';
        experienceShow += '<span id="::videoId:::" class="label-input100"></span>';
        experienceShow += '<div id="demo"></div>';
        experienceShow += '<span class="focus-input100">::name::</span>';
        experienceShow += '<iframe width="560" height="315" src="http://www.youtube.com/embed/::link::"></iframe>';
        experienceShow += '<div id = "buttons">';
        experienceShow += '<button class="buttonDes" type="button" onclick="f2(\'::userid::\',\'::data::\',1)" name="like" id ="like"><img src="../images/btn/1.png" name="like"/></button>';
        experienceShow += '<button class="buttonDes" type="button" onclick="f2(\'::userid::\',\'::data::\',2)" name="like" id ="like"><img src="../images/btn/2.png" name="like"/></button>';
        experienceShow += '<button class="buttonDes" type="button" onclick="f2(\'::userid::\',\'::data::\',3)" name="like" id ="like"><img src="../images/btn/3.png" name="like"/></button>';
        experienceShow += '<button class="buttonDes" type="button" onclick="f2(\'::userid::\',\'::data::\',4)" name="like" id ="like"><img src="../images/btn/4.png" name="like"/></button>';
        experienceShow += '<button class="buttonDes" type="button" onclick="f2(\'::userid::\',\'::data::\',5)" name="like" id ="like"><img src="../images/btn/5.png" name="like"/></button>';
        experienceShow += '';
        experienceShow += '</div>';
        experienceShow += '</div>';








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
                var enterens = data.items[0].enterens;
                if (enterens == 0)
                {
                    enterens++;
                    addEnterens(id.val().toString(),enterens);
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
                        //console.log("playarr "+playarr);
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
                }
                else {
                    enterens++;
                    addEnterens(id.val().toString(),enterens);
                    var year = data.items[0].year;
                    var country = data.items[0].country;
                    //console.log(enterens);
                    musicWrapper.html('<h3><i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>Loading</h3>');
                    var playListName = data.items[0].group.toString();
                    //var topUser= [];
                    $.get('/playList/' + playListName+"/"+id.val().toString(), function(data) {
                        //console.log("top :"+data.items[0].index+" "+data.items[0].vote+" "+data.items[0].mbid);
                        //console.log(data.items[0]);

                        var html = '';
                        var UserSize  = 4 ;
                        //console.log(data.items.length);
                        if (data.items[0].topUser.length < 4 )
                        {
                            UserSize = data.items[0].topUser.length;
                        }
                        var topUser = [];
                        for(var i = 0 ; i < UserSize ; i++)
                        {
                            topUser.push(data.items[0].topUser[i]);
                            // var item = data.items[0].topUser[i];
                            // var mbid = (item && item.mbid) ? item.mbid : '';
                            // var videoId = (item && item.videoId) ? item.videoId : '';
                            // //console.log(videoId);
                            // var title = (item && item.title)? item.title: '';
                            // var artist = (item && item.artist && item.artist)? item.artist : '';
                            // html += experienceShow.replace('::videoId::', videoId).replace('::name::', title + ' - ' + artist).replace('::link::',videoId).replace('::userid::',id.val().toString()).replace('::data::',mbid);
                            // html = html.replace(new RegExp ('::userid::','g'),id.val().toString()).replace(new RegExp('::data::','g'),mbid);
                            // $('#title').html("Your Music: "+year + ',' + country);
                        }
                        //need to check don't have a double songs.

                        var recSize = 4 ;
                        if (data.items[0].recSongs.length < recSize )
                        {
                            recSize = data.items[0].recSongs.length;
                        }
                        for(var i = 0 ; i < recSize ; i++)
                        {
                            var item = data.items[0].recSongs[i];
                            var ind = item.index;
                            var flag = false;
                            for (var j = 0 ; j < topUser.length ; j++)
                            {
                                if (topUser[j].index == ind){
                                    var item = data.items[0].recSongs[i];
                                    //console.log(item);
                                    //console.log("index: "+ topUser[j].index + " ind: "+ind);
                                    flag = true;
                                    recSize++;
                                }
                            }
                            if (!flag){
                                var item = data.items[0].recSongs[i];
                                // topUser.push(item);
                                // var mbid = (item && item.mbid) ? item.mbid : '';
                                // var videoId = (item && item.videoId) ? item.videoId : '';
                                // //console.log(videoId);
                                // var title = (item && item.title)? item.title: '';
                                // var artist = (item && item.artist && item.artist)? item.artist : '';
                                // html += experienceShow.replace('::videoId::', videoId).replace('::name::', title + ' - ' + artist).replace('::link::',videoId).replace('::userid::',id.val().toString()).replace('::data::',mbid);
                                // html = html.replace(new RegExp ('::userid::','g'),id.val().toString()).replace(new RegExp('::data::','g'),mbid);
                            }
                        }

                        //console.log(topUser);
                        var notEarSize = 2;
                        if (data.items[0].notEar.length < notEarSize )
                        {
                            notEar = data.items[0].notEar.length;
                        }
                        for(var i = 0 ; i < notEarSize ; i++)
                        {
                            var item = data.items[0].notEar[i];
                            var ind = item.index;
                            var flag = false;
                            for (var j = 0 ; j < topUser.length ; j++)
                            {
                                if (topUser[j].index == ind){
                                    var item = data.items[0].recSongs[i];
                                    //console.log(item);
                                    //console.log("index: "+ topUser[j].index + " ind: "+ind);
                                    flag = true;
                                    recSize++;
                                }
                            }
                            if (!flag){
                                var item = data.items[0].notEar[i];
                                topUser.push(item);
                                // var mbid = (item && item.mbid) ? item.mbid : '';
                                // var videoId = (item && item.videoId) ? item.videoId : '';
                                // //console.log(videoId);
                                // var title = (item && item.title)? item.title: '';
                                // var artist = (item && item.artist && item.artist)? item.artist : '';
                                // html += experienceShow.replace('::videoId::', videoId).replace('::name::', title + ' - ' + artist).replace('::link::',videoId).replace('::userid::',id.val().toString()).replace('::data::',mbid);
                                // html = html.replace(new RegExp ('::userid::','g'),id.val().toString()).replace(new RegExp('::data::','g'),mbid);
                            }
                        }
                        //console.log(topUser);
                        for (var i = 0 ; i < topUser.length ; i ++)
                        {
                            var item = topUser[i];
                            console.log(item);
                            var mbid = (item && item.mbid) ? item.mbid : '';
                            var videoId = (item && item.videoId) ? item.videoId : '';
                            //console.log(videoId);
                            var title = (item && item.title)? item.title: '';
                            var artist = (item && item.artist && item.artist)? item.artist : '';
                            html += experienceShow.replace('::videoId::', videoId).replace('::name::', title + ' - ' + artist).replace('::link::',videoId).replace('::userid::',id.val().toString()).replace('::data::',mbid);
                            html = html.replace(new RegExp ('::userid::','g'),id.val().toString()).replace(new RegExp('::data::','g'),mbid);
                            $('#title').html("Your Music: "+year + ',' + country);
                        }








                        window.scrollBy(0, 500);
                        musicWrapper.html(html);

                        //console.log("top user: "+topUser);
                    });

                }
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

        var obj =  {
            id: id.toString(),
            songs: JSON.stringify({
                id: id.toString(),
                mbid: mbid,
                vote: n
            })
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

function addEnterens(id,enterens) {
    //console.log(id +" "+enterens);
    $.get('/user/' + id.toString(), function(data) {
        //console.log(data.items);
        //console.log(data.items[0].enterens);
        if (!data.items ){
            return Error;
        }
        var obj =  {
            id: id.toString(),
            enterens: enterens
        };
        //console.log(obj);
        var $form = $( this );
        // //console.log($form);
        var url = $form.attr("action");
        url= "users/"+id.toString();
        var posting = $.post(url,obj);
        //console.log("url: "+url);
        // alert("vote add");
         posting.done(function(data) {
        //     //console.log("data:"+data);
         });
    });
}