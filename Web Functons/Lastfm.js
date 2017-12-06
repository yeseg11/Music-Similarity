function Lastfm(){

};
function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
};


function getTopTracks(Contry){
    var str ='http://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=';
    //console.log(str);
    str+= String(Contry);
    str+='&api_key=1303ce1fee46ec505e516923781ece64&format=json';
    //console.log(str);

    var item =httpGetAsync(String(str),function(data){
    //    let j = JSON.parse(data);
	console.log("***** data obj: "+data);
//	console.log("-----------------------------------------------------------------");
//	console.log("***** j obj: "+j);
//	console.log("-----------------------------------------------------------------");
  //     let stat=j.items[0].statistics;//likeCount
//	console.log("----- stat obj:    "+ stat);
//	console.log("-----------------------------------------------------------------");
     //   let like=stat.likeCount;
    //    console.log("likes number: "+like);
    });

};