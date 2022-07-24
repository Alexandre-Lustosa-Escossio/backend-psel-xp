const { StatusCodes } = require('http-status-codes');
const { Asset_Customers: assetCustomers, Assets, Customers } = require('../db/models');
const { assetService, customerService, orderPlacementService } = require('.');
const errMsgs = require('../utils/errorMessages.json');
const raiseError = require('../utils/raiseError');
const { processBuyOrder, processSellOrder } = require('../services/orderBook.service');
const financialDataApiRequest = require('../utils/financialDataApiRequests')
const Sequelize = require('sequelize');
const config = require('../db/config/config');
const sequelize = new Sequelize(config.development)

const updateAssetQuantity = async (assetDetails, { qtdeAtivo, codCliente }, orderType) => {
  const {id, Asset_Customers: {quantity}} = assetDetails
  const newQuantity = orderType === 'buy' ? quantity + qtdeAtivo : quantity - qtdeAtivo;
  await assetCustomers.update({ quantity: newQuantity },
    {
      where: {
        customer_id: codCliente,
        asset_id: id,
      },
    });
  return newQuantity; 
};

const createAssetInWallet = async ({ codAtivo, codCliente, qtdeAtivo }) => {
  const { dataValues } = await assetService.getByCode(codAtivo);
  const newCustomerAssetRecord = { customer_id: codCliente, asset_id: dataValues.id, quantity: qtdeAtivo };
  const insertedRecord = await assetCustomers.create(newCustomerAssetRecord);
  return insertedRecord;
};


const assembleOrderPayload = async (payload) => {
  const { codCliente, codAtivo, qtdeAtivo } = payload;
  const { dataValues:  { id: asset_id } } = await assetService.getByCode(codAtivo)
  const price = await financialDataApiRequest.getAssetPrice(codAtivo);
  const buyOrderObj = { customer_id: codCliente, asset_id, quantity: qtdeAtivo, price };
  return buyOrderObj;
}

const buyOrder = async (payload) => {
  const { codCliente, codAtivo } = payload;
  const customerAssetInfo = await customerService.getCustomerAssetByAssetCode(codCliente, codAtivo);
  const buyOrderObj = await assembleOrderPayload(payload);
  if (!customerAssetInfo) {
    await processBuyOrder(buyOrderObj);
    const newAssetRecord = await createAssetInWallet(payload);
    return newAssetRecord;
  }
  const transactionResponse = await sequelize.transaction(async (t) => {
    await processBuyOrder(buyOrderObj, { transaction: t });
    const newAssetQuantity = await updateAssetQuantity(customerAssetInfo.assets[0].dataValues, payload, 'buy', { transaction: t });

    return newAssetQuantity
  });
  const updatedAssetRecord = { ...payload, qtdeAtivo: transactionResponse };
  return updatedAssetRecord;
};

const sellOrder = async (payload) => {
  const { codCliente, codAtivo } = payload;
  const customerAssetInfo = await customerService.getCustomerAssetByAssetCode(codCliente, codAtivo);
  const sellOrderObj = await assembleOrderPayload(payload);
  if (!customerAssetInfo) {
    raiseError(StatusCodes.NOT_ACCEPTABLE, errMsgs.youDontHaveThatAsset);
  }
  if (customerAssetInfo.assets[0].Asset_Customers.quantity < payload.qtdeAtivo) {
    raiseError(StatusCodes.NOT_ACCEPTABLE, errMsgs.notEnoughAssetQuantity);
  }
  const transactionResponse = await sequelize.transaction(async (t) => {
    await processSellOrder(sellOrderObj, {transaction: t})
    const newAssetQuantity = await updateAssetQuantity(customerAssetInfo.assets[0].dataValues, payload, 'sell', { transaction: t })
    return newAssetQuantity
  });
  const newAssetRecord = { ...payload, qtdeAtivo: transactionResponse };
  return newAssetRecord;
};

module.exports = { buyOrder, sellOrder }