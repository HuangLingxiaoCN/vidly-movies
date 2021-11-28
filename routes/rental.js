const express = require("express");
const router = express.Router();
// Promise based Library for transactions in MongoDB
const Fawn = require("fawn");
const dotenv = require('dotenv').config().parsed;

Fawn.init(dotenv.DATABASE_URL);

const Customer = require("../models/customer");
const Movie = require("../models/movie");
const Rental = require("../models/rental");

// Get all
router.get("/", async function (req, res) {
  const rentals = await Rental.find();
  res.send(rentals);
});

// Get one
router.get("/:id", async function (req, res) {
  const rental = await Rental.findById(req.params.id);
  if (!rental)
    return res.status(404).send("The rental with given ID was not found.");
  res.send(rental);
});

// Create one
router.post("/", async function (req, res) {
  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(404).send("Not exist");

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(404).send("Not exist");
  if (movie.numberInStock === 0) return res.status(400).send("Out of stock");

  let rental = new Rental({
    customer: {
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
    dateReturned: req.body.dateReturned,
    rentalFee: req.body.rentalFee,
  });

  // using fawn to perform two phase commit transactions in mongoDB
  try {
    new Fawn.Task()
      .save("rentals", rental)
      .update(
        "movies",
        { _id: movie._id },
        {
          $inc: { numberInStock: -1 },
        }
      )
      .run();

    res.status(201).send(rental);
  } catch (err) {
    res.status(500).send("Something failed. ", err.message);
  }
});

// Update one
router.put("/:id", async function (req, res) {
  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(404).send("Not exist");

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(404).send("Not exist");

  const rental = await Rental.findByIdAndUpdate(req.params.id, {
    customer: {
      isGold: customer.isGold,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      title: movie.title,
      genre: movie.genre,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    },
    dateOut: req.body.dateOut,
    dateReturned: req.body.dateReturned,
    rentalFee: req.body.rentalFee,
  });

  res.send(rental);
});

// Delete one
router.delete("/:id", async function (req, res) {
  const rental = await Rental.findByIdAndDelete(req.params.id);
  if (!rental)
    return res.status(404).send("The rental with given ID was not found.");

  res.send(rental);
});

module.exports = router;
