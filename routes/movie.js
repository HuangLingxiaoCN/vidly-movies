const express = require("express");
const router = express.Router();

const Movie = require("../models/movie");
const { Genre } = require("../models/genre");

// Get all
router.get("/", async function (req, res) {
  const movies = await Movie.find().sort("title");
  res.send(movies);
});

// Get one
router.get("/:id", async function (req, res) {
  const movie = await Movie.findById(req.params.id);
  if (!movie)
    return res.status(404).send("The movie with given ID was not found.");
  res.send(movie);
});

// Create one
router.post("/", async function (req, res) {
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid genre.");

  let movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });

  movie = await movie.save();
  res.status(201).send(movie);
});

// Update one
router.put("/:id", async function (req, res) {
  const genre = await Genre.findById(req.body.genreId);
  if (!genre)
    return res.status(404).send("The genre with given ID was not found.");

  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    },
    { new: true }
  );

  if (!movie) return res.status(404).send('The movie with the given ID was not found.');
  
  res.send(movie);
});

// Delete one
router.delete("/:id", async function (req, res) {
  const movie = await Movie.findByIdAndDelete(req.params.id);
  if (!movie)
    return res.status(404).send("The movie with given ID was not found.");

  res.send(movie);
});

module.exports = router;
