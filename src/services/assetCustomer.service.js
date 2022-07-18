const {Asset_Customers: assetCustomers, Assets, Customers} = require('../db/models')
const assetService = require('./asset.service')
const customerService = require('./customer.service')
const b3MockApi = require('../utils/b3MockApi')
const errMsgs = require('../utils/errorMessages.json')
const { StatusCodes } = require('http-status-codes')
const raiseError = require('../utils/raiseError')

const findAssetInWallet = ({ assets },codAtivo) => {
  const foundAsset = assets.find(({dataValues}) => dataValues.asset_code === codAtivo)
  return foundAsset
}

const updateAssetQuantity = async ({dataValues}, {qtdeAtivo, codCliente}, orderType) => {
  const {id: assetId} = dataValues
  const { dataValues: assetDetails } = dataValues.Asset_Customers
  const newQuantity = orderType === 'buy'? assetDetails.quantity + qtdeAtivo: assetDetails.quantity - qtdeAtivo
  await assetCustomers.update({ quantity: newQuantity },
    {
      where: {
        customer_id: codCliente,
        asset_id: assetId
      }
    })
  return newQuantity 
}

const createAssetInWallet = async ({codAtivo, codCliente, qtdeAtivo}) => {
  const {dataValues} = await assetService.getByCode(codAtivo)
  const newCustomerAssetRecord = {customer_id: codCliente, asset_id: dataValues.id, quantity: qtdeAtivo}
  const insertedRecord = await assetCustomers.create(newCustomerAssetRecord)
  return insertedRecord
}

const handleBuyAssetScenarios = async (assetInWallet, payload) => {
  if (assetInWallet) {
    const newAssetQuantity = await updateAssetQuantity(assetInWallet, payload, 'buy')
    const updatedAssetRecord = {...payload, qtdeAtivo: newAssetQuantity}
    return updatedAssetRecord
  }
  const newAssetRecord = await createAssetInWallet(payload)
  return newAssetRecord
}

const handleSellAssetScenarios = async (assetInWallet, payload) => {
  if (!assetInWallet) {
    raiseError(StatusCodes.NOT_ACCEPTABLE, errMsgs.youDontHaveThatAsset)
  }
  const { dataValues: assetDetails } = assetInWallet.dataValues.Asset_Customers
  if (assetDetails.quantity < payload.qtdeAtivo) {
    raiseError(StatusCodes.NOT_ACCEPTABLE, errMsgs.notEnoughAssetQuantity)
  }
  const newAssetQuantity = await updateAssetQuantity(assetInWallet, payload, 'sell')
  const newAssetRecord = {...payload, qtdeAtivo: newAssetQuantity}
  return newAssetRecord
}

const requestOrderB3 = (payload) => {
  const b3Response = b3MockApi(payload)
  if (b3Response.status !== StatusCodes.OK) {
    throw b3Response
  }
}

const buyOrder = async (payload) => {
  requestOrderB3(payload)
  const { codCliente, codAtivo } = payload
  const customerAssets = await customerService.getCustomerAssets(codCliente)
  const assetInWallet = findAssetInWallet(customerAssets, codAtivo)
  const newAssetRecord = await handleBuyAssetScenarios(assetInWallet, payload)
  return newAssetRecord
}

const sellOrder = async (payload) => {
  requestOrderB3(payload)
  const {codCliente, codAtivo} = payload
  const customerAssets = await customerService.getCustomerAssets(codCliente)
  const assetInWallet = findAssetInWallet(customerAssets, codAtivo)
  const newAssetRecord = await handleSellAssetScenarios(assetInWallet, payload)
  return newAssetRecord
}

module.exports = {buyOrder, sellOrder}