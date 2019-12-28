// this file we build a schema for DB for users

// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var researchersSchema = new Schema({
    name: String,
    id: String
});

// the schema is useless so far
// we need to create a model using it
var Researchers = mongoose.model('Researchers', researchersSchema);

// make this available to our users in our Node applications
module.exports = Researchers;
