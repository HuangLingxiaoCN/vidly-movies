const mongoose = require('mongoose')

const { genreSchema } = require('./genre')

const movieSchema = mongoose.Schema({
  title: String,
  genre: genreSchema,
  numberInStock: Number,
  dailyRentalRate: Number
})

module.exports = mongoose.model('movie', movieSchema)