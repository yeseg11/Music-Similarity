var db = require('./db');
var mongoose = require('mongoose');
var Records = require('./models/records.js');
var debug = require('debug');
var request = require('request');
var async = require('async');
var youtube = require('./youtube');




var reject = function(err) {
    console.log(err.message);
    process.exit(0);
}

db().then(function() {
    var count = 0;
    Records.find({'youtube.videoId': {$exists: false}}).lean().limit(10000).exec(function(err, docs) {
        if (err) return reject(err);
        console.log(docs.length);
        async.mapLimit(docs, 20, (doc, cb) => {
            return youtube.scrapt({name: `${doc.title} - ${doc.artist[0].name}`}).then(data=>{
                doc.youtube = doc.youtube || {};
                doc.youtube.videoId = data.videoId;
                doc.youtube.views = data.views;
                if (!doc.youtube.views)
                {
                    doc.youtube.views = 1 ;
                }
                doc.youtube.tags = data.tags;
                return Records.update({_id: doc._id}, {$set: doc}, {multi: false, upsert: false}).exec(function(err, result){
                    if(err) return cb(err);
                    count++;
                    console.log(count, doc.mbId,doc.youtube.views,doc.year);
                    return cb(null, result);
                });
            }).catch(reject)
  

        }, function(err, batch) {
            if (err) return reject(err);
            console.log('done');
            process.exit(0);
        })

    })

}).catch(reject)




