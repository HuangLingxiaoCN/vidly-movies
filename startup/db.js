const mongoose = require('mongoose')
require('dotenv').config()

module.exports = function() {
  const db = process.env.db
  mongoose.connect(db)
    .then(() => console.log(`Connected to mongoDB Atlas...`))
    .catch(err => console.error(err))
}