const MovieAccessor = require('../accessor/movieAccessor');

function movieInfo(movieTitle, cb) {
  MovieAccessor.movieInfo(movieTitle,cb)
}

function listAllMovies(cb) {
  MovieAccessor.listAllMovies(cb)
}

function searchMovies(keyword,cb) {
  MovieAccessor.searchMovies(keyword,cb)
}



module.exports = {
  movieInfo,
  listAllMovies,
  searchMovies
};