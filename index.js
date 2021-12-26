const express = require("express");
const cors = require("cors");
require('dotenv').config();
const app = express();

app.use(cors());

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/prod')(app);

const PORT = process.env.PORT || 3000
const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));

module.exports = server