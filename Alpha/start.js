var http = require('http');
var fs = require('fs');
var uri = require('url');
var express = require('express');
var app = express();
var request = require('request');
//var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'myproject';
const collName ='Music';
var router = express.Router();
const models = require('./models/findByArea')(router);
const year_model = require('./models/findByYear')(router);
const music_model = require('./models/music')(router);


//var url_parts = uri.parse(req.url, true);
//console.log(url_parts);
//app.use('/models',express("models");
app.use('/routes',express.static("routes"));


app.get('/', function (req, res) {
    res.sendFile( __dirname + "/index.html" );
})

app.listen(3000, function () {
    console.log("Example app listening at localhost:3000");
})

//router.get('/', function(req, res, next) {
//    res.render(__dirname + "/index.html");
//});

//server.listen(3000);




//***************make connection to the mongo server************************************************

function conn(callback) {
    if (conn && conn.close) return callback(null, conn);
    MongoClient.connect(url, function(err, client) {
        if (err) return callback(err);
        return callback(null, client)

    });
}
//console.log(app);
//***************************get from mongoDB the data************************************
app.get('/mb/area/recording/:country_code', (req, res, next) => {

    //var url_parts = uri.parse(req.url, true);
    //console.log(url_parts);

    var country_code = req.params.country_code.toString();
   // console.log(country_code);
    //var query = {}
    //console.log(req.query.name);
    conn((err, client) => {
        if (err)  {
            console.log("ERROR");
            return next(err);
        }
        const db = client.db(dbName);
        db.collection(country_code).find().toArray(function(err, items) {
            if (items.length == 0 )
            {
                console.log("items length is 0");
                app.use('/models',models);
                let str = "http://localhost:3000/models/area/recording/"+country_code;
                //http://localhost:3000/models/recording/AX
                request(str, function (error, response, body) {
                    console.log('error:', error); // Print the error if one occurred
                });
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
//***************************************************************
/*
function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    console.log("items length is 1: "+theUrl);
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
};
*/
app.get('/mb/year/recording/:date', (req, res, next) => {

    //var url_parts = uri.parse(req.url, true);
    //console.log(url_parts);

    var date = req.params.date.toString();
    // console.log(country_code);
    //var query = {}
    //console.log(req.query.name);
    conn((err, client) => {
        if (err)  {
            console.log("ERROR");
            return next(err);
        }
        const db = client.db(dbName);
        db.collection(date).find().toArray(function(err, items) {
            if (items.length == 0 )
            {
                console.log("items length is 0.1");
                app.use('/models',year_model);
                //console.log(date);
                let str = "http://localhost:3000/models/year/recording/"+date;
                //http://localhost:3000/models/recording/1999
                request(str, function (error, response, body) {
                    console.log('error:', error); // Print the error if one occurred
                });
            }
            if (err) {
                console.log("ERROR");
                return next(err);
            }
            console.log("items length is 1.1");
            app.use('/models',year_model);
            //console.log(date);
            let str = "http://localhost:3000/models/year/recording/"+date;
            //http://localhost:3000/models/recording/1999
            request(str, function (error, response, body) {
                console.log('error:', error); // Print the error if one occurred
            });
            res.json({
                err: false,
                message: `Return ${items.length} items!`,
                items: items
            });
        });
    });
});
//***************************************************************
app.get('/mb/track/recording/:date/:country_code', (req, res, next) => {

    //var url_parts = uri.parse(req.url, true);
    //console.log(url_parts);

    var date = req.params.date.toString();
    var country_code = req.params.country_code.toString();
    //console.log(country_code);
    //var query = {}
    //console.log("HERE");
    conn((err, client) => {
        if (err)  {
            console.log("ERROR");
            return next(err);
        }
        const db = client.db(dbName);
        db.collection(collName).find({"area_code":country_code , "year":date}).toArray(function(err, items) {
            if (items.length == 0 )
            {
                console.log("items length is 0.1");
                app.use('/models',music_model);
                //console.log(date);
                let str = "http://localhost:3000/models/track/recording/"+date;
                //http://localhost:3000/models/recording/1999
                request(str, function (error, response, body) {
                    console.log('error:', error); // Print the error if one occurred
                });
            }
            if (err) {
                console.log("ERROR");
                return next(err);
            }

            console.log("items length is 1.1");
            app.use('/models',music_model);
            //console.log(date);
            let str = "http://localhost:3000/models/track/recording/"+date;
            //http://localhost:3000/models/recording/1999
            request(str, function (error, response, body) {
                console.log('error:', error); // Print the error if one occurred
            });

            res.json({
                err: false,
                message: `Return ${items.length} items!`,
                items: items
            });
        });
    });
});