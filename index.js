const express = require("express");
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const genre = require('./routes/genre');
const customer = require('./routes/customer')
const movie = require('./routes/movie')
const rental = require('./routes/rental')

app.use(express.json())
app.use('/api/genres',genre)
app.use('/api/customers',customer)
app.use('/api/movies', movie)
app.use('/api/rentals', rental)

mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console(err.message));


const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
