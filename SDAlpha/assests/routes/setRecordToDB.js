(function ($) {
    $(document).ready(function () {
        /*
        *   mbId: String,
            title: String,
            year: Number,
            artistName: String, // NEED TO BE JUST THE ARTIST NAME !!
            language: String,
            country: String,
            lyrics: String,
            genre: String,
            youtube: {},
            mbRaw: {},
        *
        * */

        $('#send').on("click", function (e) {
            console.log("here")
            var arr = ["#mbId","#title","#year","#artistName","#language","#country","#lyrics","#genre"];
            var mustInput = ["#artistName","#title","#year","#country","#language","#mbId","#youTubeId","#youTubeViews"];

            for (const element of mustInput){

                if (!$(element).length){
                    console.log('Error');
                    alert(element,"is Empty, Please enter data.");
                    return $('#error').text(element,"is Empty, Please enter data.");
                }
            }

            var artistName = $('#artistName'),
                title = $('#title'),
                year = $('#year'),
                country = $('#country'),
                language = $('#language'),
                mbId = $('#mbId'),
                youTubeId = $('#youTubeId'),
                youTubeViews = $('#youTubeViews');


            var genre = "";
            if ($('#genre').length){
                genre = $('#genre');
            }

            var lyrics = "";
            if ($('#lyrics').length){
                lyrics = $('#lyrics');
            }


            var recList = [];
            var prom = new Promise(function (resolve, reject) {
                // do a thing, possibly async, then…
                //alert(age.val()+" "+country.val()+" "+name.val()+" "+id.val());
                var i = 0;
                $.get('/mb/track/record/' + mbid, function (data) {
                    if (!data || !data.items || !data.items.length) return reject(Error("ERROR IN FIND LIST"));
                    console.log(data)
                //     var size = 25;
                //     if (data.items.length < size) {
                //         size = data.items.length;
                //     }
                //     for (i = 0; i < size; i++) {
                //         recList.push({
                //             mbid: data.items[i].mbId,
                //             title: data.items[i].title,
                //             year: parseInt(data.items[i].year),
                //             artist: data.items[i].artist,
                //             country: data.items[i].country,
                //             youtube: data.items[i].youtube,
                //         });
                //         // var rec = data.items[i];
                //     }
                //     //  console.log(recList);
                // }).then(function (response) {
                //     console.log("Success!", response);
                //     //console.log("recList!", recList);
                //     var obj = {
                //         id: id.val().toString(),
                //         age: parseInt(age.val()),
                //         country: country.val(),
                //         entrance: 0,
                //         name: name.val(),
                //         language1: language1.val(),
                //         language2: language2.val(),
                //         year: parseInt(yearTwenty),
                //         group: country.val() + yearTwenty.toString(),
                //         records: JSON.stringify(recList)
                //     };
                //
                //     //console.log("obj:",obj);
                //     //console.log("Success2!", response);
                //     var $form = $(this);
                //     console.log($form);
                //     var url = $form.attr("action");
                //     console.log(url);
                //     var posting = $.post(url, obj);
                //     posting.done(function (data) {
                //         console.log("data:" + data);
                //     });
                //     alert("user add");
                });
            });
        })
    });
})(jQuery);
