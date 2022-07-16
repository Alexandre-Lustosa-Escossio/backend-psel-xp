const assetCustomerService = require('../services/assetCustomer.service')
const buyOrder = async (req, res) => {
  const customer = await assetCustomerService.buyOrder(req.body)
  res.status(200).json(customer)
}

module.exports = {buyOrder}