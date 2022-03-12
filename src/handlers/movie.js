const res = require('express/lib/response');
const MovieService = require('../service/movie');

function movieInfo(req, res) {
  const movieTitle = req.body.title;
  MovieService.movieInfo(movieTitle, function (err,movie) {
    if (err) {
      res.status(500).send(err.message);
    }
    else {
      res.status(200).send(movie);
    }
  });
}

function listAllMovies(req, res) {
    MovieService.listAllMovies(function (err,list) {
    if (err) {
      res.status(500).send(err.message);
    }
    else {
      res.status(200).send(list);
    }
  });
}

function searchMovies(req, res) {
  const keyword= req.body.keyword;
  MovieService.searchMovies(keyword,function (err,list) {
  if (err) {
    res.status(500).send(err.message);
  }
  else {
    res.status(200).send(list);
  }
});
}

module.exports = {
  movieInfo,
  listAllMovies,
  searchMovies
};         