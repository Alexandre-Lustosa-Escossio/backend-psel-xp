//Buscar clientAssets
//Buscar nomeAtivo
//Buscar ativo na lista cliente
//Somar se ativo já presente
//Adicionar se ativo não presente
const {Asset_Customers: assetCustomers, Assets, Customers} = require('../db/models')

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

const updateAssetQuantity = async ({dataValues}, qtdeAtivo, codCliente) => {
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

const createAssetInWallet = async () => {
  return true
}

const buyOrder = async ({ codCliente, codAtivo, qtdeAtivo }) => {
  const customerAssets = await getCustomerAssets(codCliente)
  const assetInWallet = checkAssetInWallet(customerAssets, codAtivo)
  const newAssetQuantity = assetInWallet ?
    await updateAssetQuantity(assetInWallet, qtdeAtivo, codCliente) : await createAssetInWallet()
  const response = {codCliente, codAtivo, qtdeAtivo: newAssetQuantity}
  return response
}

module.exports = {buyOrder}