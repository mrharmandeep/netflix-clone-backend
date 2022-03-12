const express = require('express');
const router = express.Router();
const MovieHandler = require('../handlers/movie');

router.get('/info', MovieHandler.movieInfo);
router.get('/list',MovieHandler.listAllMovies);
router.get('/search',MovieHandler.searchMovies);

module.exports = router;