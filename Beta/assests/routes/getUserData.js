(function($) {
    $(document).ready(function() {
        //console.log("here");
        $('#send').on("click", function(e) {
            if( $('#age').length && $('#countySel').length && $('#name').length && $('#id').length)         // use this if you are using id to check
            {
                var age = $('#age'),
                    country = $('#countySel'),
                    name = $('#name'),
                    id = $('#id');

            }
            else{
                return $('#error').text("insert all the details");
            }
            if (!age.val() || age.val() == null || parseInt(age.val()) <30 || parseInt(age.val()) > 120 || country.val() === "Select Country" || !name.val() || !id.val()) {
                console.log('Error');
                alert("insert age or age bigger then 30 or insert all the details");
                return $('#error').text("insert age or age bigger then 30 or insert all the details");
            }
            //console.log(age.val()+" "+country.val()+" "+name.val()+" "+id.val());

            var yearTwenty = (new Date()).getFullYear() - parseInt(age.val()) + 20;
            console.log(yearTwenty);
            if (!yearTwenty){
                console.log("error");
                $('#error').text("the year not calculate ");
                return ;
            }
            //alert(age.val()+" "+country.val()+" "+name.val()+" "+id.val());
            var obj = {
                id:id.val(),
                age: age.val(),
                country: country.val(),
                name: name.val(),
                year: yearTwenty,
                group:country.val()+yearTwenty.toString()
            };
            console.log(obj);

            var $form = $( this );
            var url = $form.attr( "action" );
            var posting = $.post(url ,obj);
            posting.done(function( data ) {
                console.log(data);
            });

           // return obj;
            // $.get('/users/'+obj ,function(data){
            //     if(!data || !data.items || !data.items.length) return console.log("data ERROR");
            //     console.log(data.items);
            // });
        })
    });
})(jQuery);




// $.get('/mb/track/recording/' + yearTwenty + '/' + country.val(), function(data) {
//     if(!data || !data.items || !data.items.length) return musicWrapper.html('<h3>Please rephrase search</h3>');
//     var html = '';
//     for (var i = 0; i < 10; i++) {
//         var rec = data.items[i];
//         var mbid = rec.mbid;
//         var videoId = (rec && rec.youtube && rec.youtube.videoId) ? rec.youtube.videoId : '';
//         console.log(videoId);
//         var title = (rec && rec.title)? rec.title: '';
//         var artist = (rec && rec.artist && rec.artist[0] && rec.artist[0].name)? rec.artist[0].name : '';
//
//         html += template.replace('::videoId::', videoId).replace('::name::', title + ' - ' + artist).replace('::link::',videoId);
//     }