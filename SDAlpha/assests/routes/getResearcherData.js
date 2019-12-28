(function($) {
    $(document).ready(function() {
    //console.log("here");

    $('#send').on("click", function(e) {
        if( $('#name').length && $('#id').length)         // use this if you are using id to check
        {
            var name = $('#name'),
                id = $('#id');
        }
        if (!name.val()){
            alert("please insert name");
            return $('#error').text("please insert name");
        }
        if (!id.val() /*|| ValidateID(id.val()) != 1*/){
            alert("please insert ID");
            return $('#error').text("please insert ID");
        }

        var prom = new Promise(function(resolve, reject) {
            // do a thing, possibly async, then…
            //alert(age.val()+" "+country.val()+" "+name.val()+" "+id.val());
            var i = 0 ;
            $.get('/mb/track/recording/1989/IL', function(data) {
                if(!data || !data.items || !data.items.length) return reject(Error("ERROR IN FIND LIST"));
                var size = 25 ;
                if (data.items.length < size ){
                    size = data.items.length;
                }
                // for (i = 0; i < size; i++) {
                //     recList.push({
                //         mbid: data.items[i].mbId,
                //         title:data.items[i].title,
                //         year:parseInt(data.items[i].year),
                //         artist:data.items[i].artist,
                //         country:data.items[i].country,
                //         youtube:data.items[i].youtube,
                //     });
                // }
            }).then(function(response) {
                console.log("Success!", response);
                var obj = {
                    id:id.val().toString(),
                    name: name.val(),
                };
                var $form = $( this );
                var url = '/insertResearcher';
                console.log(url);
                var posting = $.post(url ,obj);
                posting.done(function(data) {
                    console.log("data:"+data);
                });
                alert("The Researcer added");
            });
        });
    })
});
})(jQuery);


// DEFINE RETURN VALUES


function ValidateID(str)
{
    //INPUT VALIDATION
    var R_ELEGAL_INPUT = -1;
    var R_NOT_VALID = -2;
    var R_VALID = 1;
    // Just in case -> convert to string
    var IDnum = String(str);

    // Validate correct input
    if ((IDnum.length > 9) || (IDnum.length < 5))
        return R_ELEGAL_INPUT;
    if (isNaN(IDnum))
        return R_ELEGAL_INPUT;

    // The number is too short - add leading 0000
    if (IDnum.length < 9)
    {
        while(IDnum.length < 9)
        {
            IDnum = '0' + IDnum;
        }
    }

    // CHECK THE ID NUMBER
    var mone = 0, incNum;
    for (var i=0; i < 9; i++)
    {
        incNum = Number(IDnum.charAt(i));
        incNum *= (i%2)+1;
        if (incNum > 9)
            incNum -= 9;
        mone += incNum;
    }
    if (mone%10 == 0)
        return R_VALID;
    else
        return R_NOT_VALID;
}
