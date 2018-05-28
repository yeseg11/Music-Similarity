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


var similarity = require( 'compute-cosine-similarity' );

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
    console.log(req.body.enterens);
    if (req.body.id && req.body.age && req.body.country && req.body.name) {
        var userData = {
            id: req.body.id.toString(),
            name: req.body.name,
            country: req.body.country,
            age: parseInt(req.body.age),
            enterens: req.body.enterens,
            year: parseInt(req.body.year),
            group:req.body.group,
            songs:[]
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
        //console.log(playlistData);
        // var bulk2 = PlayList.collection.initializeOrderedBulkOp();
        // bulk2.find({
        //     name: playlistData.name                 //update the playlist name , if have - update else its build new document
        // }).update(playlistData);
        // bulk2.execute();

        // PlayList.findOneAndUpdate({ name: playlistData.name }, function (err, data) {
        //     if (err) return handleError(err);
        //     console.log(data);
        // }).update(playlistData);

        var query = {name: playlistData.name},
            update = playlistData,
            options = { upsert: true, new: true, setDefaultsOnInsert: true };

// Find the document
    var exiset = true;
    PlayList.findOne({name: playlistData.name}, function(error, result) {
        if (error) return;
        //console.log("r1",result);
        if (!result || result == null)
            exiset = false
        // do something with the document
        //console.log(exiset);
        if (!exiset){
            PlayList.findOneAndUpdate(query, update, options, function(error, result) {
                if (error) return;
               //console.log("r2",result);
                // do something with the document
            });
        }
    });

    }
});

app.post('/users/:id', function(req, res, next) {    //call to getDataId.js , and request all the relevant data from DB
    if (!req.body) return res.sendStatus(400);

    Users.find({id:req.params.id}).exec(function(err, docs){
        if(err) return next(err);
        //console.log("docs new : "+docs);
        //console.log("enterens new : "+req.body.enterens);
        //var userData = docs[0];
        try{
            docs[0].enterens = req.body.enterens;
        }catch(e){
            return next(e);
        }
        docs[0].save(function (err, updatedUser) {
            if (err) return handleError(err);
            res.send(updatedUser);
        });
        // var bulk = Users.collection.initializeOrderedBulkOp();
        // bulk.find({
        //     id: userData.id                 //update the id , if have - update else its build new document
        // }).update({enterens:userData.enterens});

    });
});










app.get('/in', function(req, res) {       //call to users page and show him
    //console.log(res);
    res.sendFile(path.join(__dirname, 'assests', 'userIndex.html'));
    //console.log("finish ",res);
    // res.then("finish ");
});

app.get('/mb/track/recording/:year/:country', function(req, res, next) {    //call to getData.js , and request all the relevant  data from DB
    db().then(()=>{
        Records.find({year: { $gt: parseInt(req.params.year)-3, $lt: parseInt(req.params.year)+3}, country: req.params.country}).sort({'youtube.views':-1}).exec(function(err, docs){
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

app.get('/user/:id', function(req, res, next) {    //call to getDataId.js , and request all the relevant data from DB
    if (!req) return res.sendStatus(400);
    Users.find({id:req.params.id}).exec(function(err, docs){
        if(err) return next(err);
        //console.log(docs);
        res.status(200).json({err: false, items: [].concat(docs)});
    })
});

app.get('/selection/:id/:playlist', function(req, res, next) {
    if (!req.body) return res.sendStatus(400);
    //console.log(req.params.id+" "+req.params.playlist);
    Users.find({id:{$ne:req.params.id},group:req.params.playlist}).exec(function(err, docs){
        if(err) return next(err);
        console.log("docs",docs,'length',docs.length);
    });
});


app.post('/selection/:id', function(req, res, next) {    //call to getDataId.js , and request all the relevant data from DB
    if (!req.body) return res.sendStatus(400);

    Users.find({id:req.params.id}).exec(function(err, docs){
        if(err) return next(err);
        //console.log("docs new : "+docs);
        var userData =docs[0];
        try{
            userData.songs=JSON.parse(req.body.songs);
        }catch(e){
            return next(e);
        }

        //console.log("userData new : "+JSON.stringify(userData));
        // heavy lift close user connection
        //

        var bulk = Users.collection.initializeOrderedBulkOp();
        bulk.find({
            id: userData.id                 //update the id , if have - update else its build new document
        }).upsert().updateOne(userData);
        bulk.execute(function(err, BulkWriteResult){
            if(err) return next(err);
            // do cosine similirity calc in 2 minutes
            // loop all songs
            var data = userData.songs[0];

            var lookup = {'records.mbid': data.mbid};
            PlayList.findOne(lookup).exec(function(err, q){

                var pos = q.records.findIndex(e=>e.mbid == data.mbid);
                q.records[pos].votes = q.records[pos].votes || [];
                var posUser = q.records[pos].votes.findIndex(e=>e.userId == data.id);

                if(posUser >= 0){
                    q.records[pos].votes[posUser].vote = data.vote
                }else{
                    q.records[pos].votes.push({userId: data.id, vote: data.vote})
                }

                var user = [];
                var users = [];
                q.records.forEach(rec=>{

                    user.push(rec.votes.filter(x=>x.userId == data.id).map(x=>x.vote)[0] || 0);
                    rec.votes.map(function(x){
                        if(users.indexOf(x.userId) == -1 && x.userId != data.id) users.push(x.userId)
                    });
                });

                users.forEach(u=>{
                    var votesByUser = [];
                    q.records.forEach(rec=>{
                        votesByUser.push(rec.votes.filter(x=>x.userId == u).map(x=>x.vote)[0] || 0)
                    });
                    //console.log(`user: ${user}`);
                    //console.log(`votesByUser: ${votesByUser}`);
                    //console.log(similarity(user, votesByUser));
                    q.similarity = q.similarity || [];
                   var pos =  q.similarity.findIndex(x=>x.user1 == u && x.user2 == data.id || x.user2 == u && x.user1 == data.id);
                   //console.log(pos);
                   if(pos >= 0){
                    q.similarity[pos].similarity = similarity(user, votesByUser);
                   }else{
                    q.similarity.push({user1: u, user2: data.id, similarity: similarity(user, votesByUser)})
                   }
                   //console.log(q);
                });
                q.markModified('similarity');
                q.save(function(err){
                    if(err) return next(err);
                    res.json({message: 'cool man'});

                })
            });
             // PlayList.update(lookup, update, opt, function(err, resualt){
             //     res.status(200).json({err: false, message: 'updated'});
             // });


        });
       // res.status(200).json({err: false, items: [].concat(docs)});
    });
});

app.get('/playlist/:playlist/:id', function(req, res, next) {
    if (!req.body) return res.sendStatus(400);
    //console.log(req.params.id+" "+req.params.playlist);
    var id = req.params.id.toString();
    PlayList.find({"records.votes.userId":{$in:[id]}}).exec(function(err, docs){
        if(err) return next(err);
        // for(var i = 0 ; i<docs[0].records.length;i++){
        //     console.log("docs",docs[0].records[i].votes.length);
        //     //console.log("docs",docs[0].records[i].length);
        // }
        var topUser = [];
        var notEar = [];
        docs[0].records.forEach(function callback(currentValue, index, rec) {
            var index = index ;
            var o =currentValue.votes.filter(x=>x.userId == id);
            var ex = currentValue.votes.findIndex(x=>x.userId == id);
            //console.log(rec);
            if (ex != -1 )
            {
                //console.log(rec[index]);
                //console.log(index);
                //console.log(currentValue.votes.filter(x=>x.userId == id));
                //console.log(currentValue.votes.findIndex(x=>x.userId == id));
                topUser.push({index:index ,
                    vote:o[0].vote,
                    mbid:rec[index].mbid ,
                    artist:rec[index].artist[0].name,
                    title:rec[index].title,
                    videoId:rec[index].youtube.videoId
                });
            }
            else{
                notEar.push({index:index ,
                    vote:0,
                    mbid:rec[index].mbid ,
                    artist:rec[index].artist[0].name,
                    title:rec[index].title,
                    videoId:rec[index].youtube.videoId
                });
            }
        });
        topUser.sort(function (a,b) {
            return b.vote - a.vote;
        });

        var topUsers = [];
        docs[0].similarity.forEach(function callback(currentValue, index, rec) {
            if (currentValue.user1 == id || currentValue.user2 == id ){
                //console.log(currentValue);
                topUsers.push({user1:currentValue.user1 ,
                    user2:currentValue.user2,
                    similarity:currentValue.similarity
                });
            }
        });
        topUsers.sort(function (a,b) {
            return b.similarity - a.similarity;
        });

        //console.log(topUser);
        //console.log(topUsers);
        //topUsers = topUsers[0];
        //console.log(topUsers);
        var recUser ;
        if (id == topUsers[0].user1)
        {
            recUser = topUsers[0].user2;
        }
        else {
            recUser = topUsers[0].user1;
        }
        //console.log(recUser);
        var recSongs = [];
        docs[0].records.forEach(function callback(currentValue, index, rec) {
            var ind = index ;
            var o =currentValue.votes.filter(x=>x.userId == recUser);
            var ex = currentValue.votes.findIndex(x=>x.userId == recUser);
            if (ex != -1  )
            {
                //console.log(rec[index]);
                //console.log(o);
                //console.log(ex);
                 recSongs.push({index:index ,
                    vote:o[0].vote,
                    mbid:rec[index].mbid ,
                    artist:rec[index].artist[0].name,
                    title:rec[index].title,
                    videoId:rec[index].youtube.videoId
                });
            }
        });
        //console.log(recSongs);
        recSongs.sort(function (a,b) {
            return b.vote - a.vote;
        });
        //console.log(recSongs);
        var obj =[{topUser,recSongs,notEar}];
        res.status(200).json({err: false, items: [].concat(obj)});
    });
    //res.status(200).json({err: false, items: [].concat(top)});
});


// 404 not found
app.use(function(req, res, next) {
    res.sendFile(path.join(__dirname, 'assests', '404.html'));
});


db().then(() => {
    const server = app.listen(process.env.port || 3000, () => debug('app:server')(`Server has started in port ${server.address().port}`))
}).catch(() => debug('app:mongo')('Houston we got a problem.... mongo'));




