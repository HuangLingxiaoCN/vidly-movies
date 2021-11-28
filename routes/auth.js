const _ = require("lodash"); // by convention we use _ for lodash
const config = require('config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require("express");
const router = express.Router();

const { User } = require("../models/user");

// authenticate user
router.post("/", async function (req, res) {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  const passwordValid = await bcrypt.compare(req.body.password, user.password);
  if(!passwordValid) return res.status(400).send("Invalid email or password");

  const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'));

  res.send(token);
});

module.exports = router;
