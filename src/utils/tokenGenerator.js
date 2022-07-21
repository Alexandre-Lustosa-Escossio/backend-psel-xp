const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const generateToken = (payload) => {
  const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' }; 
  const token = jwt.sign({ data: payload }, process.env.JWT_SECRET, jwtConfig);
  return token;
};

const decodeToken = (token) => {
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  return decodedToken;
}

module.exports = { generateToken, decodeToken };