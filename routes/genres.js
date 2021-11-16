const express = require('express');
const router = express.Router();
const Genre = require('../models/genres');

// Get all
router.get("/", async function (req, res) {
  const genres = await Genre.find().sort('name');
  res.send(genres)
});

// Get one
router.get("/:id", async function (req, res) {
  const genre = await Genre.findById(req.params.id);
  if(!genre) return res.status(404).send('The genre with given ID was not found.');
  res.send(genre)
});

// Create one
router.post("/", async function (req, res) {

  let genre = new Genre({
    name: req.body.name,
  });
  
  genre = await genre.save();
  res.status(201).send(genre)
});

// Update one
router.put("/:id", async function (req, res) {

  const genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(404).send('The genre with given ID was not found.');  

  genre.name = req.body.name;
  genre.save();
  res.send(genre);
});

// Delete one
router.delete('/:id', async function (req, res) {
  const genre = await Genre.findByIdAndDelete(req.params.id);
  if (!genre) return res.status(404).send('The genre with given ID was not found.');

  res.send(genre);
});

module.exports = router;