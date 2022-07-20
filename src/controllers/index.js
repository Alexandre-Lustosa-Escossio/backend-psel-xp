const assetCustomerController = require('./assetCustomer.controller');
const customerController = require('./customer.controller');
const assetController = require('./asset.controller');
const checkingAccountController = require('./checkingAccount.controller');

const index = {
  assetCustomerController,
  customerController,
  assetController,
  checkingAccountController,
};

module.exports = index;