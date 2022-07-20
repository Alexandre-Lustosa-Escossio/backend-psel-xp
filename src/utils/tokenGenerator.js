const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const generateToken = (payload) => {
  const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' }; 
  const token = jwt.sign({ data: payload }, process.env.JWT_SECRET, jwtConfig);
  return token;
};

module.exports = { generateToken };