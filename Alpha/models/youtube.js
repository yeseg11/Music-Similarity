function youtube(){

};

function httpGetAsyncs(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    console.log("theUrl: "+theUrl);
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
};




function getLikes(videoId){
    var str ='https://www.googleapis.com/youtube/v3/videos?part=statistics&id=';
    //console.log(str);
    str+= String(videoId);
    str+='&key=AIzaSyDXKEiZzKTDzYIaRUG63nK7dO-h5Yykfyk';
    //console.log(str);

    var item =httpGetAsync(String(str),function(data){
        let j = JSON.parse(data);
//	console.log("***** data obj: "+data);
//	console.log("-----------------------------------------------------------------");
//	console.log("***** j obj: "+j);
//	console.log("-----------------------------------------------------------------");
        let stat=j.items[0].statistics;//likeCount
//	console.log("----- stat obj:    "+ stat);
//	console.log("-----------------------------------------------------------------");
        let like=stat.likeCount;
        console.log("likes number: "+like);
    });

};

function getCategoryId(videoId){
    var str ='https://www.googleapis.com/youtube/v3/videos?part=snippet&id=';
    //console.log(str);
    str+= String(videoId);
    str+='&key=AIzaSyDXKEiZzKTDzYIaRUG63nK7dO-h5Yykfyk';
    //console.log(str);

    var item =httpGetAsync(String(str),function(data){
        let j = JSON.parse(data);
        /*	console.log("***** data obj: "+data);
            console.log("-----------------------------------------------------------------");
            console.log("***** j obj: "+j);
            console.log("-----------------------------------------------------------------");
        */
        let stat=j.items[0].snippet;//CategoryId
//	console.log("----- stat obj:    "+ stat);
        let like=stat.categoryId;
//	console.log("-----------------------------------------------------------------");
        console.log("Category Id: "+like);
    });

};

function getTags(videoId){
    var str ='https://www.googleapis.com/youtube/v3/videos?part=snippet&id=';
    //console.log(str);
    str+= String(videoId);
    str+='&key=AIzaSyDXKEiZzKTDzYIaRUG63nK7dO-h5Yykfyk';
    //console.log(str);

    var item =httpGetAsync(String(str),function(data){
        let j = JSON.parse(data);
        /*	console.log("***** data obj: "+data);
            console.log("-----------------------------------------------------------------");
            console.log("***** j obj: "+j);
            console.log("-----------------------------------------------------------------");
        */
        let stat=j.items[0].snippet;//CategoryId
//	console.log("----- stat obj:    "+ stat);
        let tag=stat.tags;
//	console.log("-----------------------------------------------------------------");
        console.log("Tags: "+tag);
    });

};
var f = {
    search: function (search) {
    var link ="";
    var str ='https://www.googleapis.com/youtube/v3/search?part=snippet&q=';
    //console.log(str);
    str+= String(search);
    str+='&key=AIzaSyDXKEiZzKTDzYIaRUG63nK7dO-h5Yykfyk';
    //console.log("str: "+str);
/*
    var item =httpGetAsyncs(String(str),function(data){
        let j = JSON.parse(data);
        //	console.log("***** data obj: "+data);
        //  console.log("-----------------------------------------------------------------");
        //  console.log("***** j obj: "+j);
        //  console.log("-----------------------------------------------------------------");

        let stat=j.items[0].id;         //
        console.log("----- stat obj:    "+ stat);
        let videoId=stat.videoId;
//	console.log("-----------------------------------------------------------------");

        console.log("videoId: "+videoId);
        link = '<iframe width="420" height="345" src="http://www.youtube.com/embed/';
        link+=videoId.toString();
        link+='">';
        var $frame = $(link);
        $('demo').html( $frame );
        setTimeout( function() {
            var doc = $frame[0].contentWindow.document;
            var $demo = $('demo',doc);
            $demo.html('<h1>link</h1>');
        }, 1 );

    });
    */
    return str;
}
};


exports.data = f;




function search(search) {
    var link ="";
    var str ='https://www.googleapis.com/youtube/v3/search?part=snippet&q=';
    //console.log(str);
    str+= String(search);
    str+='&key=AIzaSyDXKEiZzKTDzYIaRUG63nK7dO-h5Yykfyk';
    return str;
}

