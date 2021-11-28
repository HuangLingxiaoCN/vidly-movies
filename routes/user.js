const _ = require("lodash"); // by convention we use _ for lodash
const jwt = require("jsonwebtoken");
const config = require('config');
const bcrypt = require('bcrypt');
const express = require("express");
const router = express.Router();

const { User } = require("../models/user");

// Create
router.post("/", async function (req, res) {
  // if the user has registered already
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("The user has already registered");

  user = new User(_.pick(req.body, [ 'name', 'email', 'password' ]));

  // encrypt password with bcrypt hashing
  const salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(user.password, salt)
  user = await user.save();

  const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'));

  // Send jwt token to client in the header
  res.header('x-auth-token', token).status(201).send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
