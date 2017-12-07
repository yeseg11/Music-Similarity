function musicB() {
    console.log("MB");
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


function getArtisCountry(artistName,person){ 		// if person is 0 search for person else group
    //let person = person;
    console.log(artistName)
    var str ='https://musicbrainz.org/ws/2/artist?query=';
    //console.log(str);
    str+= String(artistName);
    str+= '&fmt=json';
    console.log(str);
    var item =httpGetAsync(String(str),function(data){
        console.log("data: ", data)
        let jas = JSON.parse(data);
        console.log("jas: ", jas)
        let i = 0 ;
        let size = jas.artists.length
        for (i = 0 ; i < size ; i++) {
            //console.log("i: ", i)
            console.log("type: ", String(jas.artists[i].type))
            if ((person == 0) && (String(jas.artists[i].type) === "Person"))
            {
                console.log("try ")
                let stat=jas.artists[i].country;			//country
                console.log("stat: ", stat)
                return
            }
            else if (person == 1 && jas.artists[i].type == 'Group')
            {
                let stat=jas.artists[i].country;			//country
                console.log("stat: ", stat)
                return
            }
        }
        //}


    });

};

function getArtisByTime(start,end,person){ 		// if person is 0 search for person else group
    //let person = person;
    //console.log(artistName)
    //http://musicbrainz.org/ws/2/artist/?query=begin:[1720 TO 1900] AND end:[1720 TO 1900] AND type:"person"&fmt=json
    var str ='https://musicbrainz.org/ws/2/artist?query=begin[';
    //console.log(str);
    str+= String(start);
    str+= ' TO ';
    str+= String(end);
    str+= '] AND end:['
    str+= String(start);
    str+= ' TO ';
    str+= String(end);
    str+= '] AND type:"';
    if (person == 1)
        str+= 'group"';
    else
        str+= 'person"';
    str+= '&fmt=json';
    console.log(str);

    var item =httpGetAsync(String(str),function(data){
        console.log("data: ", data)

        let jas = JSON.parse(data);
        console.log("jas: ", jas)
        /*
        let i = 0 ;
        let size = jas.artists.length
        for (i = 0 ; i < size ; i++) {
            //console.log("i: ", i)
            console.log("type: ", String(jas.artists[i].type))
            if ((person == 0) && (String(jas.artists[i].type) === "Person"))
            {
                console.log("try ")
                let stat=jas.artists[i].country;			//country
                console.log("stat: ", stat)
                return
            }
            else if (person == 1 && jas.artists[i].type == 'Group')
                {
                let stat=jas.artists[i].country;			//country
                console.log("stat: ", stat)
                return
                }
            }
        //}

        */
    });

};


function getReleaseByDay(dayDate){ 		// if person is 0 search for person else group
    //let person = person;
    console.log(dayDate)
    var str ='http://musicbrainz.org/ws/2/release/?query=date:';
    //console.log(str);
    str+= String(dayDate);
    str+= '&fmt=json';
    console.log(str);
    var item =httpGetAsync(String(str),function(data){
        console.log("data: ", data)
        let jas = JSON.parse(data);
        console.log("jas: ", jas)
        /*
                let i = 0 ;
                let size = jas.artists.length
                console.log("size: ", size)

                for (i = 0 ; i < size ; i++) {
                    //console.log("i: ", i)
                    console.log("type: ", String(jas.artists[i].type))
                    if ((person == 0) && (String(jas.artists[i].type) === "Person"))
                    {
                        console.log("try ")
                        let stat=jas.artists[i].country;			//country
                        console.log("stat: ", stat)
                        return
                    }
                    else if (person == 1 && jas.artists[i].type == 'Group')
                        {
                        let stat=jas.artists[i].country;			//country
                        console.log("stat: ", stat)
                        return
                        }
                    }
                //}
        */

    });

}



//date:1999 and country:de and rock
function tyct(date,country,tag){ 		//songsinyearandcountryandtag
    console.log("date");
    var str ='http://musicbrainz.org/ws/2/recording/?query=date:';
    //console.log(str);
    str+= String(date);
    str+= ' AND country:';
    str+= String(country);
    str+= ' AND tag:';
    str+= String(tag);
    str+= '&fmt=json';
    console.log(str);
    var item =httpGetAsync(String(str),function(data){
       console.log("data: ", data);
       let jas = JSON.parse(data);
       console.log("jas: ", jas);
    });
};


function getArtist(artistName,person){ 		// if person is 0 search for person else group
                                                    //let person = person;
    var textFile = "/Json/artist.txt";
    var file = new File(textFile);
    file.open("w"); // open file with write access
    file.writeln("hello");
    file.close();

    console.log(artistName)
    var str ='https://musicbrainz.org/ws/2/artist?query=';
    //console.log(str);
    str+= String(artistName);
    str+= '&fmt=json';
    console.log(str);
    var item =httpGetAsync(String(str),function(data){
        console.log("data: ", data)
        let jas = JSON.parse(data);
        console.log("jas: ", jas)
        let i = 0 ;
        let size = jas.artists.length
        for (i = 0 ; i < size ; i++) {
            //console.log("i: ", i)
            console.log("type: ", String(jas.artists[i].type))
            if ((person == 0) && (String(jas.artists[i].type) === "Person"))
            {
                file.open("w"); // open file with write access
                file.writeln(String(jas.artists[i]));
                file.close();


                //console.log("try ")
                //let stat=jas.artists[i].country;			//country
                //console.log("stat: ", stat)

                return
            }
            else if (person == 1 && jas.artists[i].type == 'Group')
            {
                //let stat=jas.artists[i].country;			//country
                //console.log("stat: ", stat)
                return
            }
        }
        //}


    });

};
