const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Genre } = require("../models/genre");

// Get all
router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

// Get one
router.get("/:id", async function (req, res) {
  const genre = await Genre.findById(req.params.id);
  if (!genre)
    return res.status(404).send("The genre with given ID was not found.");
  res.send(genre);
});

// Create one (auth as a middleware function executed before the route handler to authorize the user)
router.post("/", auth, async function (req, res) {
  let genre = new Genre({
    name: req.body.name,
  });

  genre = await genre.save();
  res.status(201).send(genre);
});

// Update one
router.put("/:id", auth, async function (req, res) {
  const genre = await Genre.findById(req.params.id);
  if (!genre)
    return res.status(404).send("The genre with given ID was not found.");

  genre.name = req.body.name;
  genre.save();
  res.send(genre);
});

// Delete one (two middlewares in an array: auth and admin will be executed in sequence)
router.delete("/:id", [auth, admin], async function (req, res) {
  const genre = await Genre.findByIdAndDelete(req.params.id);
  if (!genre)
    return res.status(404).send("The genre with given ID was not found.");

  res.send(genre);
});

module.exports = router;
