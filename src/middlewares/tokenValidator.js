const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { StatusCodes } = require('http-status-codes');
const errMsgs = require('../utils/errorMessages.json');

dotenv.config();

const tokenValidator = (req, res, next) => {
  const { authorization: token } = req.headers;
  if (!token) {
    const err = new Error(errMsgs.tokenMustBeProvided);
    err.status = StatusCodes.UNAUTHORIZED;
    next(err);
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      err.status = StatusCodes.UNAUTHORIZED;
      next(err);
    } 
    res.locals.id = decoded;
  });
  next();
};

module.exports = { tokenValidator };