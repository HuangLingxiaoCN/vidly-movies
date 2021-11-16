const express = require("express");
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const genres = require('./routes/genres');
const customer = require('./routes/customer')

app.use(express.json());
app.use('/api/genres',genres);
app.use('/api/customers',customer);

mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console(err.message));


const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
