const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
  isGold: Boolean,
  name: {
    type: String,
    required: true
  },
  phone: Number,
})

module.exports = mongoose.model('Customer', customerSchema)
