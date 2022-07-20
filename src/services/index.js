const assetService = require('./asset.service');
const assetCustomerService = require('./assetCustomer.service');
const customerService = require('./customer.service');
const orderPlacementService = require('./orderPlacements.service');
const checkingAccountService = require('./checkingAccounts.service');

const index = {
  assetService,
  assetCustomerService,
  customerService,
  orderPlacementService,
  checkingAccountService,
};

module.exports = index;