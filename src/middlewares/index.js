const {validateQuantity} = require('./assetOrderValidator')
const  errorHandler  = require('./errorHandler')
const {tokenValidator } = require('./tokenValidator')

const index = {
  validateQuantity,
  errorHandler,
  tokenValidator
}

module.exports = index