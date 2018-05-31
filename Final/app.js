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

/**
 * Virtual dir for js & css for third party libraries
 */

app.use("/lib/jquery", express.static(path.join(__dirname, "node_modules", "jquery", "dist")));
app.use("/lib/bootstrap", express.static(path.join(__dirname, "node_modules", "bootstrap", "dist")));
app.use("/lib/font-awesome/css", express.static(path.join(__dirname, "node_modules", "font-awesome", "css")));
app.use("/lib/font-awesome/fonts", express.static(path.join(__dirname, "node_modules", "font-awesome", "fonts")));


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

/**
 * Statics pages
 */
app.get('/', (req, res) =>  res.sendFile(path.join(__dirname, 'assests', 'index.html'), {}, ()=>res.end())); // Static front page
app.get('/users', (req, res) => res.sendFile(path.join(__dirname, 'assests', 'insertUsers.html'), {}, ()=>res.end())); // a new user form
app.get('/in', (req, res) => res.sendFile(path.join(__dirname, 'assests', 'userIndex.html'), {}, ()=>res.end())); // login form


/** ----------------------------------------------------------------------------------
* Return the given users playlist , and add user to Data base
*
* @PARAM {String*} id: Given user id
* @PARAM {String} name: Given user name
* @PARAM {String} country: Given user name
* @PARAM {Number} age: The user age
* @PARAM {Number} enterens:The user enterens
*
* @RESPONSE {json}
* @RESPONSE-SAMPLE {playList , userData}
----------------------------------------------------------------------------------*/

app.post('/users',function(req, res, next) {
    if (!req.body) return res.sendStatus(400,"Error to add user");
    //console.log(req.body.enterens);
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

        var query = {name: playlistData.name},
            update = playlistData,
            options = { upsert: true, new: true, setDefaultsOnInsert: true };

// Find the document
    var exiset = true;
    PlayList.createIndex({name:1});
    PlayList.findOne({name: playlistData.name}, function(error, result) {
        if (error) return;
        //console.log("r1",result);
        if (!result || result == null)
            exiset = false;
        // do something with the document
        //console.log(exiset);
        if (!exiset){
            PlayList.findOneAndUpdate(query, update, options, function(error, result) {
                if (error) return;
            });
        }
    });

    }
});

/** ----------------------------------------------------------------------------------
* Return and update the enterens time of the user  to Data base
*
* @PARAM {String*} id: Given user id
* @PARAM {Number} enterens: The user enterens
*
* @RESPONSE {json}
* @RESPONSE-SAMPLE {user data: []}
----------------------------------------------------------------------------------*/


app.post('/users/:id', function(req, res, next) {
    if (!req.body) return res.sendStatus(400);

    Users.find({id:req.params.id}).exec(function(err, docs){
        if(err) return next(err);

        try{
            docs[0].enterens = req.body.enterens;
        }catch(e){
            return next(e);
        }
        docs[0].save(function (err, updatedUser) {
            if (err) return handleError(err);
            res.send(updatedUser);
        });


    });
});




/** ----------------------------------------------------------------------------------
* Return the top records of the given year between 2 year before and 2 years after
*
* @PARAM {String} year: The user 20's year
* @PARAM {String} country: The user country
*
* @RESPONSE {json}
* @RESPONSE-SAMPLE {docs: []}
----------------------------------------------------------------------------------*/
app.get('/mb/track/recording/:year/:country', function(req, res, next) {
    db().then(()=>{
        Records.find({year: { $gt: parseInt(req.params.year)-3, $lt: parseInt(req.params.year)+3}, country: req.params.country}).sort({'youtube.views':-1}).limit(25).exec(function(err, docs){
        if(err) return next(err);       //the data we get sorted from the bigest views number to the smalll ones and limit to 10 top .
        res.status(200).json({err: false, items: [].concat(docs)});
    })
}).catch(next);
});


/** ----------------------------------------------------------------------------------
* Return playlist by the playlist name.
*
* @PARAM {String*} name: the playlist name
*
* @RESPONSE {json}
* @RESPONSE-SAMPLE {docs: []}
----------------------------------------------------------------------------------*/
app.get('/playList/:name', function(req, res, next) {
    //console.log(req.params.id);
    PlayList.find({name:req.params.name}).exec(function(err, docs){
        if(err) return next(err);
        //console.log(docs);
        res.status(200).json({err: false, items: [].concat(docs)});
    })
});

/** ----------------------------------------------------------------------------------
* Return the user Data from DB
*
* @PARAM {String*} id: Given user id
*
* @RESPONSE {json}
* @RESPONSE-SAMPLE {docs: []}
----------------------------------------------------------------------------------*/
app.get('/user/:id', function(req, res, next) {    //call to getDataId.js , and request all the relevant data from DB
    if (!req) return res.sendStatus(400);
    Users.find({id:req.params.id}).exec(function(err, docs){
        if(err) return next(err);
        //console.log(docs);
        res.status(200).json({err: false, items: [].concat(docs)});
    })
});


/** ----------------------------------------------------------------------------------
* Return the user with the playlist name from the DB
*
* @PARAM {String*} id: Given user id
* @PARAM {Array} playlist: The playlist name
*
* @RESPONSE {json}
* @RESPONSE-SAMPLE {user data: []}
----------------------------------------------------------------------------------*/
app.get('/selection/:id/:playlist', function(req, res, next) {
    if (!req.body) return res.sendStatus(400);
    //console.log(req.params.id+" "+req.params.playlist);
    Users.find({id:{$ne:req.params.id},group:req.params.playlist}).exec(function(err, docs){
        if(err) return next(err);
    });
});

/** ----------------------------------------------------------------------------------
 * Post and update the the playlist with the vote of the user , add it and calculate the cosine function with similarity function
 *
 * @CALC cosine function
 *
 * @PARAM {String*} id: Given user id
 * @PARAM {String} mbid: The song mbid
 * @PARAM {String} name: the playlist name
 *
 *
 * @RESPONSE-SAMPLE {{}}
----------------------------------------------------------------------------------*/
app.post('/selection/:id', function(req, res, next) {    //call to getDataId.js , and request all the relevant data from DB
    if (!req.body) return res.sendStatus(400);

    Users.find({id:req.params.id}).exec(function(err, docs){
        if(err) return next(err);
        var userData =docs[0];
        try{
            userData.songs=JSON.parse(req.body.songs);
        }catch(e){
            return next(e);
        }

        var bulk = Users.collection.initializeOrderedBulkOp();
        bulk.find({
            id: userData.id                 //update the id , if have - update else its build new document
        }).upsert().updateOne(userData);
        bulk.execute(function(err, BulkWriteResult){
            if(err) return next(err);
            // do cosine similirity calc in 2 minutes
            // loop all songs
            var data = userData.songs[0];
            var group = userData.group;
            var lookup = {'name':group,'records.mbid': data.mbid};
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
                    q.similarity = q.similarity || [];
                   var pos =  q.similarity.findIndex(x=>x.user1 == u && x.user2 == data.id || x.user2 == u && x.user1 == data.id);
                   //console.log(pos);
                   if(pos >= 0){
                    q.similarity[pos].similarity = similarity(user, votesByUser);
                   }else{
                    q.similarity.push({user1: u, user2: data.id, similarity: similarity(user, votesByUser)})
                   }
                });
                q.markModified('similarity');
                q.save(function(err){
                    if(err) return next(err);
                    res.json({message: 'cool man'});

                })
            });
        });
    });
});


/** ----------------------------------------------------------------------------------
 * Return and update the user best song, the recommended user best songs and the unseen user song.
 *
 *
 * @PARAM {String*} id: Given user id
 * @PARAM {String} mbid: The track mbid
 * @PARAM {String} playlist: the playlist name
 * @PARAM {Number} vote: the vote for the track
 * @PARAM {String} artist: the artist name
 * @PARAM {String} title: the track name
 * @PARAM {String} videoId: the video Id number in youtube.
 *
 * @RESPONSE topUser - top user songs
 * @RESPONSE recSongs - top recommended user song
 * @RESPONSE notEar - not ear song of the user.
 *
 * @RESPONSE-SAMPLE {{obj}}
----------------------------------------------------------------------------------*/
app.get('/playlist/:playlist/:id', function(req, res, next) {
    if (!req.body) return res.sendStatus(400);
    //console.log(req.params.id+" "+req.params.playlist);
    var id = req.params.id.toString();
    //console.log(id);
    PlayList.find({"records.votes.userId":{$in:[id]}}).exec(function(err, docs){
        if(err) return next(err);
        //console.log(docs);
        if (!docs[0] || !docs )
        {
            res.sendFile(path.join(__dirname, 'assests', '404.html'));
        }
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
        if (docs[0].similarity.length != 0)
        {
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
        }

        //console.log(recSongs);
        var obj =[{topUser,recSongs,notEar}];
        res.status(200).json({err: false, items: [].concat(obj)});
    });
});

/** ----------------------------------------------------------------------------------
 * Return error page if have a problem
 * Statics page
----------------------------------------------------------------------------------*/

// 404 not found
app.use(function(req, res, next) {
    res.sendFile(path.join(__dirname, 'assests', '404.html'));
});

/** ----------------------------------------------------------------------------------
* open the connction with the DB.
----------------------------------------------------------------------------------*/
db().then(() => {
    const server = app.listen(process.env.port || 3000, () => debug('app:server')(`Server has started in port ${server.address().port}`))
}).catch(() => debug('app:mongo')('Houston we got a problem.... mongo'));




