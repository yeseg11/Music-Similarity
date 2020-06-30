(function ($) {
    $(document).ready(function () {
        // console.log("here");
        $('#send').on("click", function (e) {
            let newData = ['#name','#id','#department','#medicalProfile','#countryAtTwenty','#countryOrigin', '#age','#languageOrigin','#languageAtTwenty','#yearOfImmigration','#Genre1Select','#Genre2Select','#nursingHome'];
            let inputsArr = ['#birthYear', '#name', '#id', '#department', '#countryAtTwenty','#countryOrigin', '#languageOrigin', '#languageAtTwenty'];

            for (const element of inputsArr) {
                if (!$(element).length) {
                    return $('#error').text("insert all the details");
                }
            }

            //the new user data
            var name = $('#name'),
                id = $('#id'),
                department = $('#department'),
                medicalProfile = $('#medicalProfile'),
                birthYear = $('#birthYear'),
                countryAtTwenty = $('#countryAtTwenty'),
                countryOrigin = $('#countryOrigin'),
                language1 = $('#languageOrigin'),
                language2 = $('#languageAtTwenty'),
                yearOfImmigration = $('#yearOfImmigration'),
                Genre1Select = $('#Genre1Select'),
                Genre2Select = $('#Genre2Select'),
                nursingHome = $('#nursingHome');

            var yearTwenty = parseInt(birthYear.val()) + 20;
            // var yearTwenty = (new Date()).getFullYear() - parseInt(age.val()) + 20;
            if (!yearTwenty) {
                $('#error').text("the year not calculate ");
                return;
            }
            var recList = [];
            var prom = new Promise(function (resolve, reject) {
                let publicId = 0;
                $.get('/publicId/'+ id.val().toString(), function (data) {

                }).then(function (response) {
                    publicId = response.items[0];
                    var privateUser= {
                        name: name.val(),
                        tamaringaId: publicId,
                        privateId: id.val().toString(),
                        nursingHome: nursingHome.val(),
                    };
                    // let playlistName = countryAtTwenty.val() + language2.val() +yearTwenty.toString();
                    // $.get('/playList/e'+playlistName,function (playlist){
                    //     console.log("playlist:", playlist);
                    // }).then(function (response) {
                    //     console.log("response:", response);
                    //     recList = response
                    //     });



                    var publicUser = {
                        name: name.val(),
                        tamaringaId:publicId.toString(),
                        department: department.val(),
                        medicalProfile : medicalProfile.val(),
                        birthYear : parseInt(birthYear.val()),
                        yearAtTwenty: parseInt(yearTwenty),
                        languageOrigin : language1.val(),
                        languageAtTwenty : language2.val(),
                        countryAtTwenty: countryAtTwenty.val(),
                        countryOrigin: countryOrigin.val(),
                        yearOfImmigration : parseInt(yearOfImmigration.val()),
                        Genre1Select : Genre1Select.val(),
                        Genre2Select : Genre2Select.val(),
                        nursingHome : nursingHome.val(),
                        group: countryAtTwenty.val() + language2.val() +yearTwenty.toString(),
                        entrance: 0,
                        songs: JSON.stringify(recList)
                    };

                    //private users
                    var privateUrl = '/insertPrivateUsers';
                    var postingPrivate = $.post(privateUrl, privateUser).then(function (data) {
                    });
                    postingPrivate.done(function (data) {
                    });
                    //public users
                    var publicUrl = '/insertPublicUsers';
                    var postingPublic = $.post(publicUrl, publicUser);
                    postingPublic.done(function (data) {
                        // console.log("data:" + data);
                    });
                });
                alert("User Created");
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
