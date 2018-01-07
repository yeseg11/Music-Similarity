var http = require('http');
var fs = require('fs');
var uri = require('url');
var express = require('express');
var app = express();
var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'myproject';

//app.use(__dirname +"/js/areat.js",require("./js/areat.js"));

app.use('/js',express.static("js"));

app.get('/', function (req, res) {
    //req.url("body.js");
    //req.url("getData.js");
    res.sendFile( __dirname + "/index.html" );
})

var server = app.listen(3000, function () {
    console.log("Example app listening at localhost:3000");
})

//router.get('/', function(req, res, next) {
//    res.render(__dirname + "/index.html");
//});

//server.listen(3000);




function conn(callback) {                                    //make connection to the mongo server
    if (conn && conn.close) return callback(null, conn);
    MongoClient.connect(url, function(err, client) {
        if (err) return callback(err);
        return callback(null, client)

    });
}

app.get('/mb/recording/:country_code', (req, res, next) => {
    //console.log(req.params.country_code);
    var country_code = req.params.country_code.toString();
    //console.log(country_code);
    //var query = {}
    //console.log(req.query.name);
    conn((err, client) => {
        if (err) return next(err);
        const db = client.db(dbName);
        db.collection(country_code).find().toArray(function(err, items) {
            if (items.length == 0 )
            {
                console.log("start if 0");
               // app.use(__dirname +"/js/areat.js",require("./js/areat.js")(app));

            }
            if (err) {
                console.log("ERROR");
                return next(err);
            }
            res.json({
                err: false,
                message: `Return ${items.length} items!`,
                items: items
            });
        });
    });
});

