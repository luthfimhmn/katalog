const jwt = require('jsonwebtoken')
const secretKey = 'rahasia'

const generateToken = (payload) => jwt.sign(payload, secretKey)
const verifyToken = (token) => jwt.verify(token, secretKey)

module.exports = {
  generateToken,
  verifyToken
}