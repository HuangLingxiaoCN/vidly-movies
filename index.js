const express = require("express");
const mongoose = require('mongoose');
require('dotenv').config();
require('express-async-errors')
const winston = require('winston')
require('winston-mongodb')

const app = express();
const genre = require('./routes/genre');
const customer = require('./routes/customer')
const movie = require('./routes/movie')
const rental = require('./routes/rental')
const user = require('./routes/user')
const auth = require('./routes/auth')
const error = require('./middleware/error')

// handle uncaughtException
process.on('uncaughtException', (ex) => {
  winston.error(ex.message, ex)
  process.exit(1)
});

process.on('unhandledRejection', (ex) => {
  winston.error(ex.message, ex)
  process.exit(1)
})

winston.add(new winston.transports.File({ filename: 'logfile.log' }));
winston.add(new winston.transports.MongoDB({ db: process.env.DATABASE_URL }))

if (!process.env.vidly_jwtPrivateKey) {
  console.log('FATAL ERROR: vidly_jwtPrivateKey is not defined.');
  process.exit(1);
}

app.use(express.json())
app.use('/api/genres',genre)
app.use('/api/customers',customer)
app.use('/api/movies', movie)
app.use('/api/rentals', rental)
app.use('/api/users', user)
app.use('/api/auth', auth)

// error middleware
app.use(error)

mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console(err.message));

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
