//http://musicbrainz.org/ws/2/recording/?query=date:1999%20AND%20country:il&limit=100

//var request = require('request');
//var express = require('express');
//var MongoClient = require('mongodb').MongoClient;
//const url = 'mongodb://localhost:27017';
//var router = express.Router();
const dbName = 'myproject';
var conn;
var count = 0;
const JUMP = 100;
//var app = express();
//let get_Count;


/*
need to run with http://localhost:3000/mb/recording/Madonna
then we need to get all the recording of madonna (7245 mbid's)


//var reqUrl = 'https://musicbrainz.org/ws/2/:type?query=artist::name&fmt=json&limit=100';

http://musicbrainz.org/ws/2/recording/?query=country:il&limit=100



function conn(callback) {                                    //make connection to the mongo server
    if (conn && conn.close) return callback(null, conn);
    MongoClient.connect(url, function(err, client) {
        if (err) return callback(err);
        return callback(null, client)
    });
}
*/
//***************************************************************

// Get data from our DB
/*
app.get('/:name', (req, res, next) => {
    //var query = {}
    if (req.query.name) query.name = new RegExp('^' + req.query.name, "i");
    //console.log(req.query.name);
    conn((err, client) => {
        if (err) return next(err);
        const db = client.db(dbName);
        //console.log(db);
        db.collection('recording').find().toArray(function(err, items) {
            if (err) return next(err);
            res.json({
                err: false,
                message: `Return ${items.length} items!`,
                items: items
            });
        });
    });

});
*/
//***************************************************************


console.log("getMB");
app.get('/mb/:type/:country_code', authorize,function(req, res, next){
//http://musicbrainz.org/ws/2/recording/?query=country:il&limit=100console.log("here");
    var options = {
         url: 'https://musicbrainz.org/ws/2/:type?query=country::country_code&fmt=json&limit=:limit&offset=:offset',
         type: req.params.type,
         country_code: req.params.country_code,
         limit: JUMP,
         offset: 0
     }
    getDataAndCount(options).then(() => {
        res.json(arguments);
    }).catch(next);
 });

moudle.exports= router;



function authorize(req, res, next) {
    if (req.user === 'farmer') {
        next()
    } else {
        res.status(403).send('Forbidden')
    }
}
//***************************************************************

/*
// Get data from musicbrainz and insert & update on mongodb
app.get('/mb/:type/:country_code', function(req, res, next) {

    //http://musicbrainz.org/ws/2/recording/?query=country:il&limit=100
    var options = {
        url: 'https://musicbrainz.org/ws/2/:type?query=country::country_code&fmt=json&limit=:limit&offset=:offset',
        type: req.params.type,
        country_code: req.params.country_code,
        limit: JUMP,
        offset: 0
    }
    getDataAndCount(options).then(() => {
        res.json(arguments);
    }).catch(next);

});
*/
//***************************************************************
/*


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
*/
/*
// istanbul ignore next
if (!module.parent) {
    app.listen(3000);
    console.log('Express started on port 3000');
};
*/
//***************************************************************
function getDataAndCount(options) {

    return new Promise((resolve, reject) => {
        // validate type of HTTP request variable allowed
        var types = ['recording'];
        if (types.indexOf(options.type) == -1) return reject(new Error('Invalid type'));

        // let get pages and see if need async
        getDataFromMB({
            url: (options.url)
                .replace(':type', options.type)
                .replace(':country_code', options.country_code || '')
                .replace(':limit', options.limit || JUMP)
                .replace(':offset', (options.offset || 0).toString())

        }).then(data => {
            if (!data || !Object.keys(data).length) return reject(new Error('No data came back'));
            var prepareData = [];

            var pages = Math.ceil(parseInt(data.count) / parseInt(options.limit || JUMP));
            var done = 0;
            var responseUser = false;

            insertDataToDb({
                data: data,
                country_code: options.country_code,
                type: options.type
            }).then((response) => {
                done++;
                for (var i = 1; i <= 10/*pages*/; i++) {
                    ((page) => {

                        getDataFromMB({
                            url: (options.url)
                                .replace(':type', options.type)
                                .replace(':country_code', options.country_code || '')
                                .replace(':limit', options.limit || JUMP)
                                .replace(':offset', (page) * (options.limit || JUMP))

                        }).then((newData) => {
                            done++;
                            insertDataToDb({
                                data: newData,
                                country_code: options.country_code,
                                type: options.type
                            }).then((resDb) => {
                                done++;
                                if (done === 10/*pages*/ && !responseUser) return resolve()
                            }).catch((err) => {
                                return (!responseUser) ? reject(err) : undefined;
                            })

                        }).catch((err) => {
                            return (!responseUser) ? reject(err) : undefined;
                        })
                    })(i)
                }
            }).catch(reject);
        }).catch(reject)

    });


}
//***************************************************************



function getDataFromMB(options) {
    //console.log("url: "+options.url);
    return new Promise((resolve, reject) => {
        request({
            'method': 'GET',
            'uri': options.url,
            'headers': {
                'User-Agent': 'MY IPHINE 7s ' + (+new Date())
            }

        }, function(error, response, body) {
            if (error) return reject(error);
            if (!response || !response.statusCode || response.statusCode !== 200) {
                options.retry++;
                if (options.retry > 10) return reject(new Error('Check your ISP internet connection'));
                return setTimeout(function() {
                    getDataFromMB(options).then(resolve).catch(reject);
                }, 500 * options.retry);
            }
            console.log(`recived data from ${options.url}`);
            try {
                var data = JSON.parse(body);
                //console.log("data: "+data);
                return resolve(data);
            } catch (e) {
                return reject(e);
            }
        });
    })
}
//***************************************************************
function insertDataToDb(options) {

    return new Promise((resolve, reject) => {
        var prepareData = [];
        ([].concat(options.data[options.type + 's'])).forEach(function(a) {
            //a.area = a.area || {};
            if (!a || !a.releases[0] || !a.releases[0].country) return;

            //console.log('here');
            //console.log(a.releases[0].country);
            if (a.releases[0].country.toString() == options.country_code) {
                var d = {
                    mbid: a.id,
                    //area: {
                    //    countryCode: a.releases[0].country.toString()
                    //               {
                    //                   mbid: a.id
                    //               }

                    //    }
                    //    countryName: a.area.name
                    // },
                    // track_name: a.title,
                    // artist_name: a['artist-credit'][0].artist.name,
                    // artist_id: a['artist-credit'][0].artist.id,
                    // area_code:a.releases[0].country
                };
                prepareData.push(d);
            }

        });

        // console.log(prepareData, options.data[options.type]);
// Use connect method to connect to the server
        conn(function(err, client) {
            if (err) return reject(err);

            console.log("Connected successfully to server");
            const db = client.db(dbName);
            const collection = db.collection(options.country_code.toString());
            var batch = collection.initializeOrderedBulkOp();
            prepareData.forEach(d => {
                batch.find({
                    mbid: d.mbid
                }).upsert().update({
                    $set: d
                })
            });
            if(!batch.length) return resolve();
            batch.execute(function(err, result) {
                if (err) return reject(err);
                return resolve(result);
            });
        });
    })
}
