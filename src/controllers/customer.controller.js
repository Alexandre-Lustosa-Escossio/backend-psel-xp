const { StatusCodes } = require('http-status-codes')
const customerService = require('../services/customer.service')

const signInCustomer = async (req, res) => {
  const token = await customerService.signInCustomer(req.body)
  res.status(StatusCodes.OK).json({message: token})
}

module.exports = {signInCustomer}