const { StatusCodes } = require('http-status-codes');
const { Customers, Assets, Credentials } = require('../db/models');
const { generateToken, decodeToken } = require('../utils/tokenGenerator');
const errMsgs = require('../utils/errorMessages.json');
const handleHashes = require('../utils/handleHashes');
const raiseError = require('../utils/raiseError');
const Sequelize = require('sequelize');
const config = require('../db/config/config');
const sequelize = new Sequelize(config.development)

const getCustomerAssets = async (customerId) => {
  const customerAssets = await Customers.findOne({
    where: { id: customerId },
    include: [{ model: Assets, as: 'assets', through: { attributes: ['quantity'] } }],
  });
  return customerAssets;
};

const getCustomerAssetByAssetCode = async (customerId, assetCode) => { 
  const customerAsset = await Customers.findOne({
    where: { id: customerId },
    include: [{
      model: Assets, as: 'assets',
      through: {
        attributes: ['quantity']
      },
      where: { asset_code: assetCode }
    }],
  });
  return customerAsset
}

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
  const transactionResponse = await sequelize.transaction(async (t) => {
    const customer = await Customers.create({ customer_name, email }, { transaction: t });
    await Credentials.create({ customer_id: customer.id, password: hash }, { transaction: t });
    return customer
  })
  return  transactionResponse ;
}

module.exports = { getCustomerAssets, signInCustomer, registerCustomer, getCustomerAssetByAssetCode };