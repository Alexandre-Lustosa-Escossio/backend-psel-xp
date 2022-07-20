const { StatusCodes } = require('http-status-codes');
const { Customers, Assets, Credentials } = require('../db/models');
const { generateToken } = require('../utils/tokenGenerator');
const errMsgs = require('../utils/errorMessages.json');
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
  const { email, password } = payload;
  const customerData = await Customers.findOne({
    where: { email },
    include: [
      {
        model: Credentials,
        as: 'credentials',
        where: { password },
      },
    ],
  });
  if (!customerData) {
    const err = new Error(errMsgs.invalidEmailOrPassword);
    err.status = StatusCodes.UNAUTHORIZED;
    throw err;
  }
  const token = generateToken(customerData.id);
  return token;
};

module.exports = { getCustomerAssets, signInCustomer };