const express = require("express");
require('dotenv').config();
const app = express();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();

const PORT = process.env.PORT || 3000
const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));

module.exports = server