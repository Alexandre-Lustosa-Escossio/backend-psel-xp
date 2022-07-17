const {Asset_Customers: assetCustomers, Assets, Customers} = require('../db/models')
const assetService = require('./asset.service')
const customerService = require('./customer.service')
const b3MockApi = require('../utils/b3MockApi')

const checkAssetInWallet = ({ assets },codAtivo) => {
  const foundAsset = assets.find(({dataValues}) => dataValues.asset_code === codAtivo)
  return foundAsset
}

const updateAssetQuantity = async ({dataValues}, {qtdeAtivo, codCliente}) => {
  const {id: assetId} = dataValues
  const { dataValues: assetDetails } = dataValues.Asset_Customers
  const newQuantity = assetDetails.quantity + qtdeAtivo
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

const handleAssetScenarios = (assetInWallet, payload) => {
  if (assetInWallet) {
    const newAssetQuantity = await updateAssetQuantity(assetInWallet, payload)
    const updatedAssetRecord = {codCliente, codAtivo, qtdeAtivo: newAssetQuantity}
    return updatedAssetRecord
  }
  const newAssetRecord = await createAssetInWallet(payload)
  return newAssetRecord
}

const buyOrder = async (payload) => {
  const orderExecuted = b3MockApi(payload)
  if (orderExecuted) {
    const { codCliente, codAtivo } = payload
    const customerAssets = await customerService.getCustomerAssets(codCliente)
    const assetInWallet = checkAssetInWallet(customerAssets, codAtivo)
    const newAssetRecord = handleAssetScenarios(assetInWallet, payload)
    return newAssetRecord
  } 
  const err = new Error(errMsgs.quantityTooHigh)
  err.status = StatusCodes.INTERNAL_SERVER_ERROR
  throw err
}

module.exports = {buyOrder}