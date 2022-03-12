const Movies = require('../db/models/movie').Movies;

function movieInfo(movieTitle, cb) {
     Movies.findOne({ title: movieTitle }, { title: 1, _id: 0, cast: 1, directors: 1, plot: 1,imdb:1 }, cb)
}

function listAllMovies(cb) {
     Movies.find({}, { title: 1, _id: 0 }, cb)
}

function searchMovies(keyword,cb) {
     Movies.find({title:{$regex:keyword}}, { title: 1, _id: 0 }, cb)
}

module.exports = { movieInfo,listAllMovies,searchMovies};