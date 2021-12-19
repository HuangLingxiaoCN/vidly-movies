const { User } = require('../../../models/user')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
require('dotenv').config()

describe('user.generateAuthToken', () => {
  it('should return a valid JWT', () => {
    const payload = { 
      _id: mongoose.Types.ObjectId().toHexString(), 
      isAdmin: true 
    }
    const user = new User(payload)
    const token = user.generateAuthToken()
    const decoded = jwt.verify(token, process.env.vidly_jwtPrivateKey)
    expect(decoded).toMatchObject(payload)
  })
})