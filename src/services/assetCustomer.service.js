//Buscar clientAssets
//Buscar nomeAtivo
//Buscar ativo na lista cliente
//Somar se ativo já presente
//Adicionar se ativo não presente
const {Asset_Customers: assetCustomers, Assets, Customers} = require('../db/models')
const assetService = require('./asset.service')

const getCustomerAssets = async (customerId) => {
  const customerAssets = await Customers.findOne({
    where: { id: customerId },
    include:[{model: Assets, as: 'assets', through: {attributes: ['quantity']}}]
  })
  return customerAssets
}

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

const buyOrder = async (payload) => {
  const { codCliente, codAtivo } = payload
  const customerAssets = await getCustomerAssets(codCliente)
  const assetInWallet = checkAssetInWallet(customerAssets, codAtivo)
  if (assetInWallet) {
    await updateAssetQuantity(assetInWallet, payload)
    const updatedAssetRecord = {codCliente, codAtivo, qtdeAtivo: newAssetQuantity}
    return updatedAssetRecord
  } 
  const newAssetRecord = await createAssetInWallet(payload)
  return newAssetRecord
}

module.exports = {buyOrder}