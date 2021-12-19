require('dotenv').config()

module.exports = function() {
  if (!vidly_jwtPrivateKey) {
    throw new Error('FATAL ERROR: vidly_jwtPrivateKey is not defined.');
  }
}