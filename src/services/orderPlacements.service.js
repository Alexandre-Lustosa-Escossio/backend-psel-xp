const { Order_Placements: orderPlacement } = require('../db/models');
const financialDataApiRequest = require('../utils/financialDataApiRequests');
const assetService = require('./asset.service');

const assembleObject = ({ codAtivo, qtdeAtivo, codCliente }, assetId, price) => {
  const orderPlacementObj = {
    customer_id: codCliente,
    asset_id: assetId,
    quantity: qtdeAtivo,
    price,
  };
  return orderPlacementObj;
};

const createSellOrder = async (payload, assetId) => {
  const price = await financialDataApiRequest.getAssetPrice(payload.codAtivo);
  const orderPlacementObj = assembleObject(payload, assetId, price);
  await orderPlacement.create({ ...orderPlacementObj, type: 'sell' });
};

const createBuyOrder = async (payload) => {
  const price = await financialDataApiRequest.getAssetPrice(payload.codAtivo);
  const { id: assetId } = await assetService.getByCode(payload.codAtivo);
  const orderPlacementObj = assembleObject(payload, assetId, price);
  await orderPlacement.create({ ...orderPlacementObj, type: 'buy' });
};

module.exports = { createSellOrder, createBuyOrder };