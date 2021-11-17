const mongoose = require('mongoose')

const rentalSchema = mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
      name: String,
      isGold: Boolean,
      phone: String
    }),
    require: true
  },
  movie: {
    type: new mongoose.Schema({
      title: String,
      dailyRentalRate: Number
    }),
    require: true
  },
  dateOut: {
    type: Date,
    required: true,
    default: Date.now
  },
  dateReturned: Date,
  rentalFee: Number
})

const Rental = mongoose.model('rental', rentalSchema)

module.exports = Rental