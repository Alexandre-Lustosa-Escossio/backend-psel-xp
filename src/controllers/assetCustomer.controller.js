const { StatusCodes } = require('http-status-codes');
const assetCustomerService = require('../services/assetCustomer.service');

const buyOrder = async (req, res) => {
  const newAssetCustomerData = await assetCustomerService.buyOrder(req.body);
  res.status(StatusCodes.OK).json(newAssetCustomerData);
};

const sellOrder = async (req, res) => {
  const newAssetCustomerData = await assetCustomerService.sellOrder(req.body);
  res.status(StatusCodes.OK).json(newAssetCustomerData);
};

module.exports = { buyOrder, sellOrder }