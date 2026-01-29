const express = require('express');
const Cinema = require('../models/Cinema');

const router = express.Router();

// GET: Ver todos los cines
router.get('/', async (req, res, next) => {
  try {
    // .populate('movies') sirve para que en vez de ver solo el ID, veamos los datos de la peli
    const cinemas = await Cinema.find().populate('movies');
    return res.status(200).json(cinemas);
  } catch (error) {
    return next(error);
  }
});

// POST: Crear un cine
router.post('/', async (req, res, next) => {
  try {
    const newCinema = new Cinema(req.body);
    const createdCinema = await newCinema.save();
    return res.status(201).json(createdCinema);
  } catch (error) {
    return next(error);
  }
});

// PUT: Añadir una película a un cine (¡Muy importante!)
router.put('/add-movie', async (req, res, next) => {
  try {
    const { cinemaId, movieId } = req.body;
    const updatedCinema = await Cinema.findByIdAndUpdate(
      cinemaId,
      { $push: { movies: movieId } }, // $push añade el ID al array
      { new: true }
    );
    return res.status(200).json(updatedCinema);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;