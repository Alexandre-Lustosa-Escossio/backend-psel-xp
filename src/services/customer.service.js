const { StatusCodes } = require('http-status-codes');
const { Customers, Assets, Credentials } = require('../db/models');
const { generateToken } = require('../utils/tokenGenerator');
const errMsgs = require('../utils/errorMessages.json');
const handleHashes = require('../utils/handleHashes');
const financialDataApiRequests = require('../utils/financialDataApiRequests');
const raiseError = require('../utils/raiseError');

const requestPrice = async (asset) => {
  const price = await financialDataApiRequests.getAssetPrice(asset.asset_code);
  return price;
};

const appendAssetsPrices = async ({ assets }) => {
  const assetsWithPrice = await Promise.all(assets.map(async (asset) => {
    const price = await requestPrice(asset);
    asset.Asset_Customers.price = price;
    return asset;
  }));
  return assetsWithPrice;
};

const getCustomerAssets = async (customerId) => {
  const customerAssets = await Customers.findOne({
    where: { id: customerId },
    include: [{ model: Assets, as: 'assets', through: { attributes: ['quantity'] } }],
  });
  if (!customerAssets) {
    raiseError(StatusCodes.NOT_FOUND, errMsgs.noneInvestedYet);
  }
  customerAssets.assets = await appendAssetsPrices(customerAssets);
  return customerAssets;
};

const signInCustomer = async (payload) => {
  const { email, senha: password } = payload;
  const customerData = await Customers.findOne({
    where: { email },
    include: [
      {
        model: Credentials,
        as: 'credentials',
      },
    ],
  });
  !customerData && raiseError(StatusCodes.UNAUTHORIZED, errMsgs.invalidEmailOrPassword);
  const isValidPassword = await handleHashes.decrypt(password, customerData.credentials.password);
  !isValidPassword && raiseError(StatusCodes.UNAUTHORIZED, errMsgs.invalidEmailOrPassword);
  const token = generateToken(customerData.id);
  return token;
};

const registerCustomer = async (payload) => { 
  const { nome: customer_name, email, senha: password } = payload;
  const customerData = await Customers.findOne({ where: { email } });
  if (customerData) {
    raiseError(StatusCodes.CONFLICT, errMsgs.emailAlreadyExists);
  }
  const hash = await handleHashes.hash(password);
  // Transaction to create customer and credentials
  const customer = await Customers.create({ customer_name, email});
  await Credentials.create({ customer_id: customer.id, password: hash });
  return  customer ;
}

module.exports = { getCustomerAssets, signInCustomer, registerCustomer };