const express = require('express');
const Movie = require('../models/Movie');

const router = express.Router();

// --- GET (Leer) ---
router.get('/', async (req, res, next) => {
  try {
    const movies = await Movie.find();
    return res.status(200).json(movies);
  } catch (error) {
    return next(error);
  }
});

router.get('/id/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const movie = await Movie.findById(id);
    if (movie) {
      return res.status(200).json(movie);
    } else {
      return res.status(404).json('No se ha encontrado la película');
    }
  } catch (error) {
    return next(error);
  }
});

router.get('/title/:title', async (req, res, next) => {
  try {
    const { title } = req.params;
    const movie = await Movie.find({ title: title });
    return res.status(200).json(movie);
  } catch (error) {
    return next(error);
  }
});

router.get('/genre/:genre', async (req, res, next) => {
  try {
    const { genre } = req.params;
    const movies = await Movie.find({ genre: genre });
    return res.status(200).json(movies);
  } catch (error) {
    return next(error);
  }
});

router.get('/year/:year', async (req, res, next) => {
  try {
    const { year } = req.params;
    const movies = await Movie.find({ year: { $gt: year } });
    return res.status(200).json(movies);
  } catch (error) {
    return next(error);
  }
});

// --- POST (Crear) ---
router.post('/', async (req, res, next) => {
  try {
    const newMovie = new Movie(req.body);
    const createdMovie = await newMovie.save();
    return res.status(201).json(createdMovie);
  } catch (error) {
    return next(error);
  }
});

// --- PUT (Editar) ---
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const movieModified = await Movie.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json(movieModified);
  } catch (error) {
    return next(error);
  }
});

// --- DELETE (Borrar) ---
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await Movie.findByIdAndDelete(id);
    return res.status(200).json('Película eliminada correctamente');
  } catch (error) {
    return next(error);
  }
});

module.exports = router;