const { validateQuantity } = require('./assetOrderValidator');
const errorHandler = require('./errorHandler');
const { tokenValidator, checkIfCustomerIsOwner } = require('./tokenValidator');
const { validateCashAmount } = require('./checkingAccountValidator');

const index = {
  validateQuantity,
  errorHandler,
  tokenValidator,
  validateCashAmount,
  checkIfCustomerIsOwner
};

module.exports = index;