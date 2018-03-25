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
            console.log(age.val()+" "+country.val()+" "+name.val()+" "+id.val());

            var yearTwenty = (new Date()).getFullYear() - parseInt(age.val()) + 20;
            console.log(yearTwenty);
            if (!yearTwenty){
                console.log("error");
                $('#error').text("the year not calculate ");
                return ;
            }

            alert("data add");
        })
    });
})(jQuery);
