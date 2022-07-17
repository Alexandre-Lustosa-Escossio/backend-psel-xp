const { StatusCodes } = require('http-status-codes')
const errMsgs = require('./errorMessages.json')
const maxQuantityAllowed = 100
const b3MockApi = (payload) => {
  if (payload.qtdeAtivo > maxQuantityAllowed) {
    return false
  }
  return true
}