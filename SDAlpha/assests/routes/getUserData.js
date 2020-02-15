(function ($) {
    $(document).ready(function () {
        console.log("here");
        $('#send').on("click", function (e) {

            let inputsArr = ['#age', '#name', '#id', '#department', '#countrySel1','#countrySel2', '#language1Select', '#language2Select'];
            for (const element of inputsArr) {
                console.log(element,element.length);
                if (!$(element).length) {
                    console.log("here3");
                    return $('#error').text("insert all the details");
                }
            }

            var age = $('#age'),
                countrySel1 = $('#countrySel1'),
                countrySel2 = $('#countrySel2'),
                name = $('#name'),
                id = $('#id'),
                language1 = $('#language1Select'),
                language2 = $('#language2Select');


            if (!age.val() || age.val() == null || parseInt(age.val()) < 30 || parseInt(age.val()) > 120) {
                //console.log('Error');
                alert("insert age or age between 30 to 120");
                return $('#error').text("insert age or age between 30 to 120");
            }
            if (countrySel1.val() === "Select Country" || countrySel2.val() === "Select Country") {
                //console.log('Error');
                alert("please select a country");
                return $('#error').text("please select a country");
            }
            if (language1.val() === "Select Language") {
                //console.log('Error');
                alert("please select a language");
                return $('#error').text("please select a language");
            }
            if (language2.val() === "Select Language") {
                //console.log('Error');
                alert("please select a language");
                return $('#error').text("please select a language");
            }
            if (!name.val()) {
                //console.log('Error');
                alert("please insert name");
                return $('#error').text("please insert name");
            }
            if (!id.val() /*|| ValidateID(id.val()) != 1*/) {
                console.log('Error');
                alert("please insert ID");
                return $('#error').text("please insert ID");
            }

            var yearTwenty = (new Date()).getFullYear() - parseInt(age.val()) + 20;
            //console.log(yearTwenty);
            if (!yearTwenty) {
                //console.log("error");
                $('#error').text("the year not calculate ");
                return;
            }
            var recList = [];
            var prom = new Promise(function (resolve, reject) {
                // do a thing, possibly async, then…
                //alert(age.val()+" "+country.val()+" "+name.val()+" "+id.val());
                var i = 0;
                $.get('/mb/track/recording/' + yearTwenty + '/' + countrySel1.val(), function (data) {
                    if (!data || !data.items || !data.items.length) return reject(Error("ERROR IN FIND LIST"));
                    var size = 25;
                    if (data.items.length < size) {
                        size = data.items.length;
                    }
                    for (i = 0; i < size; i++) {
                        recList.push({
                            mbid: data.items[i].mbId,
                            title: data.items[i].title,
                            year: parseInt(data.items[i].year),
                            artist: data.items[i].artist,
                            country: data.items[i].countrySel1,
                            youtube: data.items[i].youtube,
                        });
                        // var rec = data.items[i];
                    }
                    //  console.log(recList);
                }).then(function (response) {
                    // console.log("Success!", response);
                    //console.log("recList!", recList);
                    var obj = {
                        id: id.val().toString(),
                        age: parseInt(age.val()),
                        country: countrySel1.val(),
                        entrance: 0,
                        name: name.val(),
                        language1: language1.val(),
                        language2: language2.val(),
                        year: parseInt(yearTwenty),
                        group: countrySel1.val() + yearTwenty.toString(),
                        records: JSON.stringify(recList)
                    };
                    var publicUser= {
                        name: name.val(),
                        publicId: String,
                        privateId: id.val().toString(),
                        organization: id.val().toString(),
                    };

                    console.log("obj: ",obj);
                    //console.log("Success2!", response);
                    var $form = $(this);
                    console.log($form);
                    var url = $form.attr("action");
                    console.log("Url: ", url);
                    var posting = $.post(url, obj);
                    posting.done(function (data) {
                        console.log("data:" + data);
                    });
                    alert("user add");
                });
            });
        })
    });
})(jQuery);


// DEFINE RETURN VALUES


// function ValidateID(str)
// {
//     //INPUT VALIDATION
//     var R_ELEGAL_INPUT = -1;
//     var R_NOT_VALID = -2;
//     var R_VALID = 1;
//     // Just in case -> convert to string
//     var IDnum = String(str);
//
//     // Validate correct input
//     if ((IDnum.length > 9) || (IDnum.length < 5))
//         return R_ELEGAL_INPUT;
//     if (isNaN(IDnum))
//         return R_ELEGAL_INPUT;
//
//     // The number is too short - add leading 0000
//     if (IDnum.length < 9)
//     {
//         while(IDnum.length < 9)
//         {
//             IDnum = '0' + IDnum;
//         }
//     }
//
//     // CHECK THE ID NUMBER
//     var mone = 0, incNum;
//     for (var i=0; i < 9; i++)
//     {
//         incNum = Number(IDnum.charAt(i));
//         incNum *= (i%2)+1;
//         if (incNum > 9)
//             incNum -= 9;
//         mone += incNum;
//     }
//     if (mone%10 == 0)
//         return R_VALID;
//     else
//         return R_NOT_VALID;
// }
