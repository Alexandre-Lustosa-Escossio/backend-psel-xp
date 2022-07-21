const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { StatusCodes } = require('http-status-codes');
const errMsgs = require('../utils/errorMessages.json');
const raiseError = require('../utils/raiseError');

dotenv.config();

const tokenValidator = (req, res, next) => {
  const { authorization: token } = req.headers;
  if (!token) {
    raiseError(StatusCodes.UNAUTHORIZED, errMsgs.tokenMustBeProvided);
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      err.status = StatusCodes.UNAUTHORIZED;
      next(err);
    } 
    res.locals.id = decoded.data;
  });
  next();
};

const checkIfCustomerIsOwner = (req, res, next) => {
  const { id: customerId } = res.locals;
  const { id: searchedCustomerId } = req.params;
  customerId !== +searchedCustomerId && raiseError(StatusCodes.UNAUTHORIZED, errMsgs.customerIsNotOwner)
  next()
};

module.exports = { tokenValidator, checkIfCustomerIsOwner };