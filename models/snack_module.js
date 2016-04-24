'use strict';
const mongoose = require('mongoose');

const snackSchema = new mongoose.Schema({
  name: String,
  ingredients: [String],
  tags: [String]
});

module.exports = mongoose.model('Snack', snackSchema);
