const { StatusCodes } = require('http-status-codes');
const customerService = require('../services/customer.service');
const errMsgs = require('../utils/errorMessages');
const appendAssetsPrices = require('../utils/appendAssetsPrices');

const assembleCustomerAssetsResponse = (customerAssets) => {
  const { assets, id: CodCliente } = customerAssets;
  const assembledResponse = assets.map((asset) => ({
    CodCliente,
    CodAtivo: asset.asset_code,
    QtdeAtivo: asset.Asset_Customers.quantity,
    Valor: asset.Asset_Customers.price,
  }));
  return assembledResponse;
};

const signInCustomer = async (req, res) => {
  const token = await customerService.signInCustomer(req.body);
  res.status(StatusCodes.OK).json({ message: token });
};

const getCustomerAssets = async (req, res) => {
  const { id } = req.params; 
  const customerAssets = await customerService.getCustomerAssets(id);
  if (!customerAssets) {
    raiseError(StatusCodes.NOT_FOUND, errMsgs.noneInvestedYet);
  }
  customerAssets.assets = await appendAssetsPrices(customerAssets);
  const assembledResponse = assembleCustomerAssetsResponse(customerAssets);
  res.status(StatusCodes.OK).json(assembledResponse);
};

const registerCustomer = async (req, res) => {
  const { body } = req;
  const customer = await customerService.registerCustomer(body);
  res.status(StatusCodes.OK).json(customer);
}


module.exports = { signInCustomer, getCustomerAssets, registerCustomer };