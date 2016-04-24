'use strict';
const mongoose = require('mongoose');

const actorSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteColor: String
});

module.exports = mongoose.model('Actor', actorSchema);
