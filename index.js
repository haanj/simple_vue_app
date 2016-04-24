'use strict';
let S_PORT = Number(process.env.S_PORT) || 3000;
let DB_PORT = process.env.DB;

let bodyParser = require('body-parser');
let express = require('express');
let app = express();

let mongoose = require('mongoose');
let Movie = require('./models/movie_module');
let Snack = require('./models/snack_module');

mongoose.connect(DB_PORT);

app.use((req, res, next)=> {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Overwrite, Destination, Content-Type, Depth, User-Agent, Translate, Range, Content-Range, Timeout, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control, Location, Lock-Token, If');
  res.header('Access-Control-Allow-Methods', 'ACL, CANCELUPLOAD, CHECKIN, CHECKOUT, COPY, DELETE, GET, HEAD, LOCK, MKCALENDAR, MKCOL, MOVE, OPTIONS, POST, PROPFIND, PROPPATCH, PUT, REPORT, SEARCH, UNCHECKOUT, UNLOCK, UPDATE, VERSION-CONTROL');
  next();
});

app.use(bodyParser.json());

// /Movies routes
app.route('/movies')
  .get((req, res) => {
    console.log('GET request received for /movies');
    Movie.find({})
      .populate('actors')
      .exec((err, movies) => {
        if (err) return res.send(err);
        res.json(movies);
      });
  })
  .post((req, res) => {
    console.log('POST request received for /movies');
    var newMovie = new Movie(req.body);
    newMovie.save((err, movie) => {
      res.json(movie);
    });
  });

app.route('/movies/:id')
  .get((req, res) => {
    console.log('GET request received for /movies/' + req.params.id);
    Movie.findById(req.params.id)
      .populate('actors')
      .exec((err, movie) => {
        res.json(movie);
      });
  })
  .put((req, res) => {
    console.log('PUT request received for /movies/' + req.params.id);
    Movie.update({_id: req.params.id}, req.body, (err, movie) => {
      res.json(movie);
    });
  })
  .delete((req, res) => {
    console.log('DELETE request received for /movies/' + req.params.id);
    Movie.findById(req.params.id, (err, movie) => {
      movie.remove();
      res.json(movie);
    });
  });

// /Snacks routes
app.route('/snacks')
  .get((req, res) => {
    console.log('GET request received for /snacks');
    Snack.find({}, (err, snacks) => {
      if (err) return res.send(err);
      res.json(snacks);
    });
  })
  .post((req, res) => {
    console.log('POST request received for /snacks');
    var newSnack = new Snack(req.body);
    newSnack.save((err, snack) => {
      res.json(snack);
    });
  });

app.route('/snacks/:id')
  .get((req, res) => {
    console.log('GET request received for /snacks/' + req.params.id);
    Snack.findById(req.params.id, (err, snack) => {
      res.json(snack);
    });
  })
  .put((req, res) => {
    console.log('PUT request received for /snacks/' + req.params.id);
    Snack.update({_id: req.params.id}, req.body, (err, snack) => {
      res.json(snack);
    });
  })
  .delete((req, res) => {
    console.log('DELETE request received for /snacks/' + req.params.id);
    Snack.findById(req.params.id, (err, snack) => {
      snack.remove();
      res.json(snack);
    });
  });

// /suggest route
app.route('/suggest')
  .get((req, res, next) => {
    console.log('GET request received for /suggest');
    res.suggestion = {};
    next();
  })
  .get((req, res, next) => {
    console.log('Getting random movie');
    Movie.find({})
      .populate('actors')
      .exec((err, movies) => {
        if (err) return res.send(err);
        let random = Math.floor(Math.random() * movies.length);
        res.suggestion.movie = movies[random];
        next();
      });
  })
  .get((req, res, next) => {
    console.log('Getting random snack');
    Snack.find({}, (err, snacks) => {
      if (err) return res.send(err);
      let random = Math.floor(Math.random() * snacks.length);
      res.suggestion.snack = snacks[random];
      next();
    });
  })
  .get((req, res) => {
    console.log('Returning random movie and random snack');
    res.json(res.suggestion);
  });

app.listen(S_PORT, () => {
  console.log('Server started on port', S_PORT);
});
