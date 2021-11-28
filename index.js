const express = require("express");
const mongoose = require('mongoose');
require('dotenv').config();
const config = require('config');

const app = express();
const genre = require('./routes/genre');
const customer = require('./routes/customer')
const movie = require('./routes/movie')
const rental = require('./routes/rental')
const user = require('./routes/user')
const auth = require('./routes/auth')

if (!config.get('jwtPrivateKey')) {
  console.log('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}

app.use(express.json())
app.use('/api/genres',genre)
app.use('/api/customers',customer)
app.use('/api/movies', movie)
app.use('/api/rentals', rental)
app.use('/api/users', user)
app.use('/api/auth', auth)

mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console(err.message));

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
