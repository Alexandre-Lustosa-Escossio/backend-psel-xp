const { StatusCodes } = require('http-status-codes');
const { Asset_Customers: assetCustomers, Assets, Customers } = require('../db/models');
const { assetService, customerService, orderPlacementService } = require('.');
const errMsgs = require('../utils/errorMessages.json');
const raiseError = require('../utils/raiseError');
const { processBuyOrder, processSellOrder } = require('../utils/orderBookMatching');
const financialDataApiRequest = require('../utils/financialDataApiRequests')

const findAssetInWallet = ({ assets }, codAtivo) => {
  const foundAsset = assets.find(({ dataValues }) => dataValues.asset_code === codAtivo);
  return foundAsset;
};

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
  // Fazer uma transaction
  await processBuyOrder(buyOrderObj);
  const newAssetQuantity = await updateAssetQuantity(customerAssetInfo.assets[0].dataValues, payload, 'buy');
  const updatedAssetRecord = { ...payload, qtdeAtivo: newAssetQuantity };
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
  // Fazer uma transaction
  await processSellOrder(sellOrderObj)
  const newAssetQuantity = await updateAssetQuantity(customerAssetInfo.assets[0].dataValues, payload, 'sell');
  const newAssetRecord = { ...payload, qtdeAtivo: newAssetQuantity };
  return newAssetRecord;
};

module.exports = { buyOrder, sellOrder }