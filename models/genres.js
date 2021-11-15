const mongoose = require('mongoose');

const genreSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  }
})

const genreModel = mongoose.model('Genre', genreSchema)

module.exports = genreModel