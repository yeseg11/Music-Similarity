// this file we build a schema for DB



// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var playlistSchema = new Schema({
    name:String,
    year:Number,
    country:String,
    records: {}
});

// the schema is useless so far
// we need to create a model using it
var PlayList = mongoose.model('PlayList', playlistSchema);

// make this available to our users in our Node applications
module.exports = PlayList;