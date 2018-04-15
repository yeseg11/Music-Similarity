//the main app !!

const express = require('express');
const app = express();
const debug = require('debug');
const path = require('path');
const db = require('./db');
const bodyParser = require('body-parser');
var Records = require('./models/records.js');
var Users = require('./models/users.js');
var PlayList = require('./models/playlist.js');

app.use("/", express.static(path.join(__dirname, "assests")));
/* Virtual dir for js & css for third party libraries */
app.use("/lib/jquery", express.static(path.join(__dirname, "node_modules", "jquery", "dist")));
app.use("/lib/bootstrap", express.static(path.join(__dirname, "node_modules", "bootstrap", "dist")));
app.use("/lib/font-awesome/css", express.static(path.join(__dirname, "node_modules", "font-awesome", "css")));
app.use("/lib/font-awesome/fonts", express.static(path.join(__dirname, "node_modules", "font-awesome", "fonts")));


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


app.get('/', function(req, res) {       //call to index page and show him , its the lending page
    res.sendFile(path.join(__dirname, 'assests', 'index.html'));
});

app.get('/users', function(req, res) {       //call to users page and show him
    //console.log(res);
    var r = res.sendFile(path.join(__dirname, 'assests', 'insertUsers.html'));
    //console.log("finish ",res);
   // res.then("finish ");
});


app.post('/users',function(req, res, next) {       //call to users page and show him
    if (!req.body) return res.sendStatus(400);
    if (req.body.id && req.body.age && req.body.country && req.body.name) {
        var userData = {
            id: req.body.id.toString(),
            name: req.body.name,
            country: req.body.country,
            age: parseInt(req.body.age),
            year: parseInt(req.body.year),
            group:req.body.group,
            likes:{},
            unlike:{}
        };
        var bulk = Users.collection.initializeOrderedBulkOp();
        bulk.find({
            id: userData.id                 //update the id , if have - update else its build new document
        }).upsert().updateOne(userData);
        bulk.execute();

        var playlistData = {
            name:req.body.group,
            year:parseInt(req.body.year),
            country:req.body.country,
            records: JSON.parse(req.body.records)
        };
        //console.log(JSON.parse(req.body.records));
        console.log(playlistData);
        var bulk2 = PlayList.collection.initializeOrderedBulkOp();
        bulk2.find({
            name: playlistData.name                 //update the playlist name , if have - update else its build new document
        }).upsert().updateOne(playlistData);

        bulk2.execute();

    }
});

app.get('/in', function(req, res) {       //call to users page and show him
    //console.log(res);
    res.sendFile(path.join(__dirname, 'assests', 'userIndex.html'));
    //console.log("finish ",res);
    // res.then("finish ");
});

app.get('/mb/track/recording/:year/:country', function(req, res, next) {    //call to getData.js , and request all the relevant  data from DB
    db().then(()=>{
        Records.find({year: parseInt(req.params.year), country: req.params.country}).sort({'youtube.views':-1}).exec(function(err, docs){
        if(err) return next(err);       //the data we get sorted from the bigest views number to the smalll ones and limit to 10 top .
        res.status(200).json({err: false, items: [].concat(docs)});
    })
}).catch(next);
});

app.get('/playList/:name', function(req, res, next) {    //call to getDataId.js , and request all the relevant  data from DB
    //console.log(req.params.id);
    PlayList.find({name:req.params.name}).exec(function(err, docs){
        if(err) return next(err);
        //console.log(docs);
        res.status(200).json({err: false, items: [].concat(docs)});
    })
});

app.get('/user/:id', function(req, res, next) {    //call to getDataId.js , and request all the relevant  data from DB
    console.log(req.params.id);
    Users.find({id:req.params.id}).exec(function(err, docs){
        if(err) return next(err);
        //console.log(docs);
        res.status(200).json({err: false, items: [].concat(docs)});
    })
});


// 404 not found
app.use(function(req, res, next) {
    res.sendFile(path.join(__dirname, 'assests', '404.html'));
});






db().then(() => {
    const server = app.listen(process.env.port || 3000, () => debug('app:server')(`Server has started in port ${server.address().port}`))
}).catch(() => debug('app:mongo')('Houston we got a problem.... mongo'));