const { StatusCodes } = require('http-status-codes')
const assetCustomerService = require('../services/assetCustomer.service')

const buyOrder = async (req, res) => {
  const newAssetCustomerData = await assetCustomerService.buyOrder(req.body)
  res.status(StatusCodes.CREATED).json(newAssetCustomerData)
}

module.exports = {buyOrder}