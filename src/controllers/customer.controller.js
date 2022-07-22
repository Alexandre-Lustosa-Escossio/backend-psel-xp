const { StatusCodes } = require('http-status-codes');
const customerService = require('../services/customer.service');
const financialDataApiRequests = require('../utils/financialDataApiRequests');

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
  const assembledResponse = assembleCustomerAssetsResponse(customerAssets);
  res.status(StatusCodes.OK).json(assembledResponse);
};

const registerCustomer = async (req, res) => {
  const { body } = req;
  const customer = await customerService.registerCustomer(body);
  res.status(StatusCodes.OK).json(customer);
}

const { MatchingEngine, OrderSide } = require('exchange-macthing-engine');
const teste = async (req, res) => { 
  const matchingEngine = new MatchingEngine()
  const primeiroResultado = matchingEngine.newOrder('Instrument', 12.5, 5, OrderSide.buy)
  const segundoResultado = matchingEngine.newOrder('Instrument', 12.5, 5, OrderSide.sell)
  console.log(segundoResultado)
  console.log(matchingEngine.orderBooks)
}

module.exports = { signInCustomer, getCustomerAssets, registerCustomer, teste };