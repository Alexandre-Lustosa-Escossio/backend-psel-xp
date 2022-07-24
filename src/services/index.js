const assetService = require('./asset.service');
const assetCustomerService = require('./assetCustomer.service');
const customerService = require('./customer.service');
const checkingAccountService = require('./checkingAccounts.service');

const index = {
  assetService,
  assetCustomerService,
  customerService,
  checkingAccountService,
};

module.exports = index;