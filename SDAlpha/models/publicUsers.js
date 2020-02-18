// this file we build a schema for DB for users

// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var publicUsersSchema = new Schema({
    name: String,
    tamaringaId:String,
    department: String,
    medicalProfile : String,
    age : String,
    year: String,
    countrySel1: String,
    countrySel2: String,
    language1Select : String,
    language2Select : String,
    yearOfImmigration : String,
    Genre1Select : String,
    Genre2Select : String,
    nursingHome : String,
    group: String,
    songs: []
});

// the schema is useless so far
// we need to create a model using it
var PublicUsers = mongoose.model('PublicUsers', publicUsersSchema);

// make this available to our users in our Node applications
module.exports = PublicUsers;
