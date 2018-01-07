var http = require('http');
var fs = require('fs');
var uri = require('url');
var express = require('express');
var app = express();
var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'myproject';
var router = express.Router();
const models = require('./models/findByYaer')(router);

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
app.get('/mb/recording/:country_code', (req, res, next) => {

    //var url_parts = uri.parse(req.url, true);
    //console.log(url_parts);

    var country_code = req.params.country_code.toString();
    //console.log(country_code);
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

                //app.use()

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
