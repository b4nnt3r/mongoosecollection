const express = require('express');
const mongoose = require('mongoose');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator')
const moviesSchema = require('./models/schema.js');
const MongoClient = require('mongodb').MongoClient;
let url = 'mongodb://127.0.0.1:27017/moviesdb';

mongoose.Promise = require('bluebird');

const app = express();

mongoose.connect('mongodb://localhost:27017/moviesdb');

app.use(express.static('public'))
app.use(expressValidator())

app.engine('mustache', mustacheExpress());

app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

let findAll = function(db, callback) {
  let collection = db.collection('movies');
  collection.find().toArray(function(err, result) {
    console.log("found", result.length, "movies");
    callback(result);
  });
}

app.get('/', function(request, response) {
  MongoClient.connect(url, function(err, db) {
    findAll(db, function(result) {
      response.render('index', {
        movies: result
      });
    });
  });
});

app.post('/', function(request, response) {

  request.assert(moviesSchema);
  const Movie = mongoose.model('Movie', moviesSchema);
  let movie = new Movie({
    title: "Stay"
  });
  movie.genre.push("Drama");

  movie.save().then(function() {
    console.log('movie saved');
  }).catch(function() {
    console.log("Mongo couldn\'t save movie");

    request.assert(moviesSchema);
    request.getValidationResult().then(function(results) {
      if (results.isEmpty()) {
        response.render('answers', {
          answers: request.body
        });
      } else {
        response.render('form', {
          errors: results.array()
        });
      }
    });
  });
});

app.listen(3000, function() {
  console.log('Movies listening on port 3000');
});
