(function($) {
    $(document).ready(function() {

        // var musicWrapper = $('#musicWrapper');
        // /**
        //  *  @NAME template,experienceShow: add the video and the vote buttons to screen (HTML)
        //  *
        //  *
        //  */
        // var template  = '<div class="wrap-input100 input100-select">';
        // template += '<span id="::videoId:::" class="label-input100"></span>';
        // template += '<div id="demo"></div>';
        // template += '<span class="focus-input100">::name::</span>';
        // template += '<iframe width="560" height="315" src="http://www.youtube.com/embed/::link::"></iframe>';
        // template += '<div id = "buttons">';
        // template += '<button class="buttonDes" type="button" onclick="f2(\'::userid::\',\'::data::\',1)" name="like" id ="like"><img src="../images/btn/1.png" name="like"/></button>';
        // template += '<button class="buttonDes" type="button" onclick="f2(\'::userid::\',\'::data::\',2)" name="like" id ="like"><img src="../images/btn/2.png" name="like"/></button>';
        // template += '<button class="buttonDes" type="button" onclick="f2(\'::userid::\',\'::data::\',3)" name="like" id ="like"><img src="../images/btn/3.png" name="like"/></button>';
        // template += '<button class="buttonDes" type="button" onclick="f2(\'::userid::\',\'::data::\',4)" name="like" id ="like"><img src="../images/btn/4.png" name="like"/></button>';
        // template += '<button class="buttonDes" type="button" onclick="f2(\'::userid::\',\'::data::\',5)" name="like" id ="like"><img src="../images/btn/5.png" name="like"/></button>';
        // template += '';
        // template += '</div>';
        // template += '</div>';
        //
        //
        //
        // var experienceShow  = '<div class="wrap-input100 input100-select">';
        // experienceShow += '<span id="::videoId:::" class="label-input100"></span>';
        // experienceShow += '<div id="demo"></div>';
        // experienceShow += '<span class="focus-input100">::name::</span>';
        // experienceShow += '<iframe width="560" height="315" src="http://www.youtube.com/embed/::link::"></iframe>';
        // experienceShow += '<div id = "buttons">';
        // experienceShow += '<button class="buttonDes" type="button" onclick="f2(\'::userid::\',\'::data::\',1)" name="like" id ="like"><img src="../images/btn/1.png" name="like"/></button>';
        // experienceShow += '<button class="buttonDes" type="button" onclick="f2(\'::userid::\',\'::data::\',2)" name="like" id ="like"><img src="../images/btn/2.png" name="like"/></button>';
        // experienceShow += '<button class="buttonDes" type="button" onclick="f2(\'::userid::\',\'::data::\',3)" name="like" id ="like"><img src="../images/btn/3.png" name="like"/></button>';
        // experienceShow += '<button class="buttonDes" type="button" onclick="f2(\'::userid::\',\'::data::\',4)" name="like" id ="like"><img src="../images/btn/4.png" name="like"/></button>';
        // experienceShow += '<button class="buttonDes" type="button" onclick="f2(\'::userid::\',\'::data::\',5)" name="like" id ="like"><img src="../images/btn/5.png" name="like"/></button>';
        // experienceShow += '';
        // experienceShow += '</div>';
        // experienceShow += '</div>';


        // onclick="location.href='researches'
        $('#send').on("click", function(e) {
            if( $('#id').length)         // use this if you are using id to check
            {
                var id = $('#id');
                //console.log(id.val().toString());
            }
            else{
                return $('#error').text("insert id!");
            }
            var html = '';
            $.get('/insertResearcher/' + id.val().toString(), function(data) {
                if(!data || !data.items || !data.items.length) return musicWrapper.html('<h3>Please rephrase search</h3>');
                // console.log(data.items[0].name);
                let name = data.items[0].name;
                    $('#title').html("Hello "+name);
            });
                window.scrollBy(0, 500);
                musicWrapper.html(html);
        });
    });
})(jQuery);

/** ----------------------------------------------------------------------------------
 * Update or Add the vote number.
 *
 * @PARAM {String*} id: Given user id
 * @PARAM {String} mbid: Given song mbid
 * @PARAM {Number} n: vote number

 *
 * @RESPONSE {json}
 * @RESPONSE-SAMPLE {playList , userData}
 ---------------------------------------------------------------------------------- */


function f2(id,mbid,n) {
    $.get('/user/' + id.toString(), function(data) {

        if (n <=0 || !n || n>5)
            n = 0;
        //console.log(data.items[0].group);
        if (!data.items ){
            return Error;
        }

        var obj =  {
            id: id.toString(),
            group:data.items[0].group,
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
    $.get('/user/' + id.toString(), function(data) {
        // console.log(data.items[0].enterens);
        if (data.items[0].enterens == 0){
            addEnterens(data.items[0].id,1);
        }

    });

}
/** ----------------------------------------------------------------------------------
 * Update the enterens times .
 *
 * @PARAM {String*} id: Given user id
 * @PARAM {String} enterens: enterens number.
 *
 * @RESPONSE {json}
 * @RESPONSE-SAMPLE {playList , userData}
 ---------------------------------------------------------------------------------- */
function addEnterens(id,enterens) {
    $.get('/insertResearcher/' + id.toString(), function(data) {
        //console.log(data.items);
        var enter = enterens;
        //console.log(data.items[0].enterens);
        //console.log(data.items[0].songs.length);
        if (data.items[0].songs.length === 0 )
        {
            enter = 0;
        }
        if (!data.items ){
            return Error;
        }
        var obj =  {
            id: id.toString(),
            enterens: enter
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
