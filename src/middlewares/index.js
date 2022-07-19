const { validateQuantity } = require('./assetOrderValidator')
const  errorHandler  = require('./errorHandler')
const { tokenValidator } = require('./tokenValidator')
const { validateCashAmount } = require('./checkingAccountValidator')

const index = {
  validateQuantity,
  errorHandler,
  tokenValidator,
  validateCashAmount,
}

module.exports = index