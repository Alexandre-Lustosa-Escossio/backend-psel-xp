const { StatusCodes } = require('http-status-codes')
const errMsgs = require('../utils/errorMessages.json')
const validateQuantity = (req, _res, next) => {
  const {qtdeAtivo} = req.body
  if (qtdeAtivo <= 0) {
    const err = new Error(errMsgs.quantityTooLow)
    err.status = StatusCodes.UNPROCESSABLE_ENTITY
    next(err)
  }
  next()
}

module.exports = {validateQuantity}