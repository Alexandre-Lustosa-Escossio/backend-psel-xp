const { order_placement: orderPlacement } = require('../db/models')
const financialDataApiRequest = require('../utils/financialDataApiRequests')

const assembleObject = ({codAtivo, qtdeAtivo,codCliente }, assetId, price) => {
  const orderPlacementObj = {
    customer_id: codCliente,
    asset_id: assetId,
    quantity: qtdeAtivo,
    type: 'sell',
    price
  }
  return orderPlacementObj
}

const createSellOrder = async (payload, assetId) => {
  const price = await financialDataApiRequest.getAssetPrice(codAtivo)
  const orderPlacementObj = assembleObject(payload, assetId, price)
  await orderPlacement.create(orderPlacementObj)
}

module.exports = {createSellOrder}