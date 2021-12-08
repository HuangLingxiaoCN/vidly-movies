const mongoose = require('mongoose')
require('dotenv').config()

module.exports = function() {
  const db = process.env.DATABASE_URL_TEST
  mongoose.connect(db)
    .then(() => console.log(`Connected to ${db}...`))
    .catch(err => console.error(err))
}