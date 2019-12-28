// this file we build a schema for DB



// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var recordsSchema = new Schema({
  mbId: String,
    title: String,
    year: Number,
    artist: String,
    language: String,
    country: String,
    releaseId:String,
    mbRaw: {},
    youtube: {}
});

// the schema is useless so far
// we need to create a model using it
var Records = mongoose.model('Records', recordsSchema);

// make this available to our users in our Node applications
module.exports = Records;