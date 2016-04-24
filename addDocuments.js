'use strict';
let DB_PORT = process.env.DB || require('./.config').DB;
let mongoose = require('mongoose');
let Movie = require('./models/movie_module');
let Snack = require('./models/snack_module');
let Actor = require('./models/actor_module');

mongoose.connect(DB_PORT);

// ---- CONFIG OPTIONS ---- \\
let globalNums = {
  actorCounter: 0,
  movieCounter: 0,
  snackCounter: 0,
  counter: 0,
  total: 20
};

let actors = {
  names: ['Antonio Banderas', 'Jackie Chan', 'Clint Eastwood', 'Johnny Depp', 'Jack Black', 'Mel Gibson', 'Ice Cube', 'Snoop Dogg', 'Charlie Crawford', 'Angelina Jolie', 'Reese Witherspoon', 'Jennifer Lawrence', 'Emma Stone', 'Emma Watson', 'Rowan Atkinson'],
  colors: ['blue', 'red', 'salmon', 'green', 'purple', 'black', 'blood-red']
};

let movies = {
  names: ['Nacho Libre', 'Princess Bride', 'Toy Story', 'Shrek', 'Star Wars', 'Top Gun', 'Waterboy', 'Goldeneye'],
  imdb: [9.8, 4.4, 5.0, 8.6, 10, 7],
  tags: ['comedy', 'tragedy', 'horror', 'chick flick', 'musical', 'adventure', 'foreign film']
};

// Snacks ingredients arrays must match indexes of corresponding snack names because i was lazy
let snacks = {
  names: ['Nachos', 'Chips', 'Popcorn', 'Coleslaw', 'Baked Beans'],
  ingredients: [['chips', 'cheese'], ['chips'], ['popcorn', 'heat'], ['cabbage', 'stuff'], ['beans']],
  tags: ['Zesty', 'Tasty', 'Delicious', 'Adventurous']
};

// ----- END CONFIG ----- \\

let addActors = () => {
  console.log('Adding actors');
  actors.names.forEach((actor) => {
    let randomColor = Math.floor(Math.random() * actors.colors.length);
    let newActor = new Actor({
      name: actor,
      favoriteColor: actors.colors[randomColor],
      age: Math.floor((Math.random() * 30) + 18)
    });
    newActor.save(() => {
      console.log(actor, 'added');
      globalNums.actorCounter += 1;
      if (globalNums.actorCounter == actors.names.length) {
        console.log('Finished adding actors\n');
        addMovies();
      }
    });
  });
};

let addMovies = () => {
  console.log('Adding movies');
  Actor.find({}, (err, actorsList) => {
    movies.names.forEach((movie) => {
      let randomActor1 = Math.floor(Math.random() * actorsList.length);
      let randomActor2 = Math.floor(Math.random() * actorsList.length);
      let randomRating = Math.floor(Math.random() * movies.imdb.length);
      let randomTag = Math.floor(Math.random() * movies.tags.length);
      let newMovie = new Movie({
        name: movie,
        imdb: movies.imdb[randomRating],
        tags: movies.tags[randomTag],
        actors: [actorsList[randomActor1]._id, actorsList[randomActor2]._id]
      });
      newMovie.save(() => {
        console.log(movie, 'added');
        globalNums.movieCounter += 1;
        if (globalNums.movieCounter == movies.names.length) {
          console.log('Finished adding movies\n');
          addSnacks();
        }
      });
    });
  });
};

let addSnacks = () => {
  console.log('Adding snacks');
  snacks.names.forEach((snack, index) => {
    let randomTag = Math.floor(Math.random() * snacks.tags.length);
    let newSnack = new Snack({
      name: snack,
      ingredients: snacks.ingredients[index],
      tags: snacks.tags[randomTag]
    });
    newSnack.save(() => {
      console.log(snack, 'added');
      globalNums.snackCounter += 1;
      if (globalNums.snackCounter == snacks.names.length) {
        console.log('Finished adding snacks\n');
        shutDown();
      }
    });

  });
};

let shutDown = () => {
  console.log('Upload complete');
  mongoose.connection.close();
};

let start = () => {
  console.log('Adding documents to collections...');
  addActors();
};

start();
