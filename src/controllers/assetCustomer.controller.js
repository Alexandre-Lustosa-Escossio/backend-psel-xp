const customerService = require("../services/customer.service")
const {Customer} = require('../db/models')
const buyOrder = async (req, res) => {
  const {codCliente} = req.body
  const customer = await Customer.findAll()
  res.status(200).json(customer)
}

module.exports = {buyOrder}