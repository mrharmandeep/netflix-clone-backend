const mongoose = require('mongoose');
const MovieSchema = require('../schema/movie').MovieSchema;

const Movies = mongoose.model('movies', MovieSchema);

module.exports = {
  Movies
};