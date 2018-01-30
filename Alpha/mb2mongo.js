var db = require('./db');
var mongoose = require('mongoose');
var Records = require('./models/records.js');
var glob = require("glob");
var path = require('path');
var async = require('async')


// fsGlob.readdir('./mb-raw/**/*.json', function(err, files) {
//   console.log(err || files);
// });

glob(path.join(__dirname, "/mb-raw/**/*.json"), {}, function(err, files) {
    if (err) return console.log(err);

    var total = 0;

    db().then(function() {

        async.mapLimit(files.slice(process.env.from, process.env.to), 5, function(file, cb){
            try{
                var data = require(file);
            }catch(e){
                var data = [];
            }

            if(!data.length) return cb();
            

            var bulk = Records.collection.initializeOrderedBulkOp();


            ([].concat(data)).forEach(function(el) {
                var year =parseInt(el['releases'][0]['date']);
                var p = 0; //the place in the arr with the loast year
                for(var i = 0; i < el['releases'].length;i++)   //  search the smallest year and add it to mongo year.
                {
                    var a = parseInt(el['releases'][i]['date']);
                    if (year>a) {
                        year = a;
                        p = i;
                    }
                }
                var prepare = {
                    mbId: el.id,
                    title: el.title,
                    //year: parseInt(el['releases'][0]['date']),
                    year: year,
                    artist: [{
                        name: el['artist-credit'][0].artist.name,
                        language: 'EN-US'
                    }],
                    country: el['releases'][p]['country'],
                    mbRaw: el,
                    youtube: {}
                }
                bulk.find({
                    mbId: el.id
                }).upsert().updateOne(prepare);
            });
            if(!bulk.length){
                return cb();
            }
            total += bulk.length;
            console.log(`Gooing to execute ${bulk.length}, so far ${total}`);

            bulk.execute(function(err, data){
                console.log(data.toJSON());
                delete bulk;
                return cb(err)
            });

        }, function(err, data) {
            console.log(err || data);
            process.exit(0);
        })
    }).catch((err) => console.log(err))
})