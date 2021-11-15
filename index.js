const express = require("express");
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const genres = require('./routes/genres');

app.use(express.json());
app.use('/api/genres',genres);


mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console(err.message));

app.listen(3000, () => console.log(`Listening on port 3000...`));
