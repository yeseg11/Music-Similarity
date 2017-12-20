var request = require('request');
var express = require('express');
var MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'myproject';
var conn;
var count = 0;
const JUMP = 100;
var app = express();
let get_Count;


/*
need to run with http://localhost:3000/mb/recording/Madonna
then we need to get all the recording of madonna (7245 mbid's)

 */




//var reqUrl = 'https://musicbrainz.org/ws/2/:type?query=artist::name&fmt=json&limit=100';

//https://musicbrainz.org/ws/2/artist?query=coldplay
//var reqUrl = 'https://musicbrainz.org/ws/2/artist?query=:artist&fmt=json';

function conn(callback) {
    if (conn && conn.close) return callback(null, conn);
    MongoClient.connect(url, function(err, client) {
        if (err) return callback(err);
        return callback(null, client)
    });
}

//***************************************************************

// Get data from our DB

app.get('/:name', (req, res, next) => {
    var query = {}
    if (req.query.name) query.name = new RegExp('^' + req.query.name, "i");
    //console.log(req.query.name);
    conn((err, client) => {
    if (err)    return next(err);

    const db = client.db(dbName);
    //console.log(db);
    db.collection('artist').find(query).toArray(function(err, items) {
        if (err) return next(err);
        res.json({
            err: false,
            message: `Return ${items.length} items!`,
            items: items
            });
        });

    });

});
//***************************************************************


// Get data from musicbrainz and insert & update on mongodb
app.get('/mb/:type/:name', function(req, res, next) {
    var index=0;
    //console.log(type);
    //console.log(req.params.name);
    //reqUrl+='&offset=0'+index.toString();
    //console.log("here");
    //getCount(reqUrl,req,res,next);
    //for (var i = 0 ; i < count ; i+=JUMP){
    //    console.log(i);
        var reqUrl = 'https://musicbrainz.org/ws/2/:type?query=artist::name&fmt=json&limit=100';
        reqUrl+='&offset='+index.toString();
    //    console.log(reqUrl);
        //sleep(1000);
        getDataAndCount(reqUrl,req,res,next);
        console.log("1");
         //getData(reqUrl,req,res,next);
    //}
});













app.get('/', function(req, res) {
    res.send('Hello World');
});

app.use(function(req, res, next) {
    res.status(401).json({
        err: true,
        message: 'Unkonw url request!'
    });
});

app.use(function(err, req, res, next) {
    console.log(err);
    res.status(422).json({
        err: true,
        message: err.message,
        stack: err.stack
    });
});




/* istanbul ignore next */
if (!module.parent) {
    app.listen(3000);
    console.log('Express started on port 3000');
};


function getDataAndCount(reqUrl,req,res,next) {
    var types = ['recording','release'];
    if(types.indexOf(req.params.type) == -1) return next(new Error('Invalid type'));
    //console.log(req.params.type);
    //var type = req.params.type.toString();
    getFromDB({
        url: reqUrl.replace(':type', req.params.type).replace(':name', req.params.name)

    },function(err, data) {

        if (err || !data || !Object.keys(data).length) return next(err || new Error('No data came back'));

        var prepareData = [];
        //console.log("here");
        count = data.count;
         get_Count = new Promise(
            (resolve, reject) => { // fat arrow
                if (count > 0) {
                    const work ="wait for count1: "+count;
                    //console.log("wait for count1: "+count);
                    resolve(work);
                }
                else {
                    const reason = new Error('sagi is not happy');
                    reject(reason);
                }

            }
        );
         // add runing on getData count times
        get_Count.then(function() {
            /* do something with the result */
            console.log("2");
            console.log("wait for count2: "+count);
            for (let k =0 ; k < count ;k+=100){

                reqUrl = 'https://musicbrainz.org/ws/2/:type?query=artist::name&fmt=json&limit=100';
                reqUrl+='&offset='+k.toString();
                console.log(reqUrl);
                getData (reqUrl,req,res,next);
            }
        }).catch(function() {
            console.log("3");
            /* error :( */
        })
        /*
        data.recordings.forEach(function(a) {
            //a.area = a.area || {};
            if (a['artist-credit'][0].artist.name == req.params.name ){
                var d = {
                    mbid: a.id,
                    track_name: a.title,
                    artist_name:a['artist-credit'][0].artist.name,
                    artist_id:a['artist-credit'][0].artist.id,
                    area:a.releases[0].country
                    // area: {
                    //     countryCode: a.country,
                    //     countryName: a.area.name
                    // },
                    // tags: [].concat(a.tags).filter(x => (x && x.name)).map(x => x.name)
                };
                prepareData.push(d);
                //console.log(prepareData);
            }

        });

        // Use connect method to connect to the server
        conn(function(err, client) {
            if (err) return next(err);

            console.log("Connected successfully to server");
            //console.log("dbname: "+dbName);
            const db = client.db(dbName);
            const collection = db.collection(type.toString());

            var batch = collection.initializeOrderedBulkOp();

            prepareData.forEach(d => {
                batch.find({
                mbid: d.mbid
            }).upsert().update({
                $set: d
            })
        });
            batch.execute(function(err, result) {

                if (err) return next(err);
                res.json(result);
            });
        });
        */
    });
}




function getFromDB(options, callback) {
//console.log("url: "+options.url);
request({
'method': 'GET',
'uri': options.url,
'headers': {
   'User-Agent': 'MY IPHINE 7s ' + (+new Date())
}

}, function(error, response, body) {
if (error) return callback(error);
if (!response || !response.statusCode || response.statusCode !== 200) {
   options.retry++;
   if (options.retry > 10) return callback(new Error('Check your ISP internet connection'));
   return setTimeout(function() {
       getFromDB(options, callback)
   }, 500 * options.retry);
}

try {
   var data = JSON.parse(body);
   //console.log("data: "+data);
   return callback(null, data);
} catch (e) {
   callback(e);
}
});
}












function getData (reqUrl,req,res,next){
var types = ['recording','release'];
if(types.indexOf(req.params.type) == -1) {
    return next(new Error('Invalid type'));
}
//console.log(req.params.type);
var type = req.params.type.toString();
getFromDB({
url: reqUrl.replace(':type', req.params.type).replace(':name', req.params.name)

},function(err, data) {

if (err || !data || !Object.keys(data).length) return next(err || new Error('No data came back'));

var prepareData = [];
data.recordings.forEach(function(a) {
   //a.area = a.area || {};
   if (a['artist-credit'][0].artist.name == req.params.name ){
       var d = {
           mbid: a.id,
           track_name: a.title,
           artist_name:a['artist-credit'][0].artist.name,
           artist_id:a['artist-credit'][0].artist.id,
           //area:a.releases[0].country
           // area: {
           //     countryCode: a.country,
           //     countryName: a.area.name
           // },
           // tags: [].concat(a.tags).filter(x => (x && x.name)).map(x => x.name)
       };
       prepareData.push(d);
       //console.log(prepareData);
   }

});
// Use connect method to connect to the server
conn(function(err, client) {
   if (err) return next(err);

   console.log("Connected successfully to server");
   //console.log("dbname: "+dbName);
   const db = client.db(dbName);
   const collection = db.collection(type.toString());

   var batch = collection.initializeOrderedBulkOp();

   prepareData.forEach(d => {
       batch.find({
           mbid: d.mbid
       }).upsert().update({
           $set: d
       })
   });
   batch.execute(function(err, result) {

       if (err) return next(err);
       res.json(result);
   });
});
});
}