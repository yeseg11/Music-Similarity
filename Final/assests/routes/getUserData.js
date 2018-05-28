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
            //console.log(yearTwenty);
            if (!yearTwenty){
                console.log("error");
                $('#error').text("the year not calculate ");
                return ;
            }
            var recList = [];
            var prom = new Promise(function(resolve, reject) {
                // do a thing, possibly async, then…
                //alert(age.val()+" "+country.val()+" "+name.val()+" "+id.val());
                var i = 0 ;
                $.get('/mb/track/recording/' + yearTwenty + '/' + country.val(), function(data) {
                    if(!data || !data.items || !data.items.length) return reject(Error("ERROR IN FIND LIST"));
                    var size = 30 ;
                    if (data.items.length < size ){
                        size = data.items.length;
                    }
                    for (i = 0; i < size; i++) {
                        recList.push({
                            mbid: data.items[i].mbId,
                            title:data.items[i].title,
                            year:parseInt(data.items[i].year),
                            artist:data.items[i].artist,
                            country:data.items[i].country,
                            youtube:data.items[i].youtube,
                        });
                        // var rec = data.items[i];

                    }
                  //  console.log(recList);
                }).then(function(response) {
                    //console.log("Success!", response);
                    //console.log("recList!", recList);
                    var obj = {
                        id:id.val().toString(),
                        age: parseInt(age.val()),
                        country: country.val(),
                        enterens: 0,
                        name: name.val(),
                        year: parseInt(yearTwenty),
                        group:country.val()+yearTwenty.toString(),
                        records:JSON.stringify(recList)
                    };

                    //console.log("obj:",obj);
                    //console.log("Success2!", response);
                    var $form = $( this );
                    //console.log($form);
                    var url = $form.attr( "action" );
                   //console.log(url);
                    var posting = $.post(url ,obj);
                    posting.done(function(data) {
                        //console.log("data:"+data);

                   });
                    alert("user add");
                    //return(obj);
                });
            });
            // prom.then(function(response) {
            //     console.log("res!", response);
            // });


        })
    });
})(jQuery);
