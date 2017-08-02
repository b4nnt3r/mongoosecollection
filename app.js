const express = require('express');
const mongoose = require('mongoose');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const mongoClient = require('mongodb').MongoClient;

mongoose.Promise = require('bluebird');

const app = express();

mongoose.connect('mongodb://localhost:27017/databasename');

const moviesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  year: Number,
  director: [{
    firstName: String,
    lastName: String
  }],
  boxoffice: {
    type: Number
  },
  genre: [{
    type: String,
    lowercase: true
  }],
  synopsis: String,
  format: [{
    type: String,
    lowercase: true,
    default: 'dvd'
  }]
})

const Movie = mongoose.model('Movie', moviesSchema);
let movie = new Movie({title: "Stay"});
movie.genre.push("Drama");

// console.log(recipe.toObject());

movie.save().then(function(){
console.log('movie saved');
}).catch(function(){
  //handle error
  console.log("Mongo couldn\'t save movie");
});
