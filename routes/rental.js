const express = require("express");
const router = express.Router();

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
  const movie = await Movie.findById(req.body.movieId);

  let rental = new Rental({
    customer: {
      name: customer.name,
      isGold: customer.isGold,
      phone: customer.phone,
    },
    movie: {
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
    dateOut: req.body.dateOut,
    dateReturned: req.body.dateReturned,
    rentalFee: req.body.rentalFee,
  });

  rental = await rental.save();
  res.status(201).send(rental);
});

// Update one
router.put("/:id", async function (req, res) {
  const customer = await Customer.findById(req.body.customerId);
  const movie = await Movie.findById(req.body.movieId);

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
