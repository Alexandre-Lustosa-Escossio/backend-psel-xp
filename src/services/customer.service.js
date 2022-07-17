const { Customers, Assets, Credentials } = require('../db/models')
const { generateToken } = require('../utils/tokenGenerator')
const errMsgs = require('../utils/errorMessages.json')
const { StatusCodes } = require('http-status-codes')

const getCustomerAssets = async (customerId) => {
  const customerAssets = await Customers.findOne({
    where: { id: customerId },
    include:[{model: Assets, as: 'assets', through: {attributes: ['quantity']}}]
  })
  return customerAssets
}

const signInCustomer = async (payload) => {
  const { email, password } = payload
  const customerData = await Customers.findOne({
    where: { email },
    include: [
      {
        model: Credentials,
        as: 'credentials',
        where: { password: password }
      }
    ]
  })
  if (!customerData) {
    const err = new Error(errMsgs.invalidEmailOrPassword)
    err.status = StatusCodes.UNAUTHORIZED
    throw err
  }
  const token = generateToken(customerData.id)
  return token
}

module.exports = {getCustomerAssets, signInCustomer}