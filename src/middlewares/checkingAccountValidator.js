const { StatusCodes } = require('http-status-codes');
const raiseError = require('../utils/raiseError');
const errMsgs = require('../utils/errorMessages.json');

const validateCashAmount = (req, res, next) => {
  const { Valor } = req.body;
  if (!Valor || Valor < 0) {
    raiseError(StatusCodes.UNPROCESSABLE_ENTITY, errMsgs.cashAmountTooLow);
  }
  if (typeof Valor !== 'number') {
    raiseError(StatusCodes.UNPROCESSABLE_ENTITY, errMsgs.nonNumericalCashAmount);
  }
  next();
};

module.exports = { validateCashAmount };