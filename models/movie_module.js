'use strict';
require('./actor_module');
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  name: String,
  imbd: Number,
  tags: [String],
  actors: [{type: mongoose.Schema.Types.ObjectId, ref: 'Actor'}]
});

module.exports = mongoose.model('Movie', movieSchema);
