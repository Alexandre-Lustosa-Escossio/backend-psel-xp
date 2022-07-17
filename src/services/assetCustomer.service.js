//Buscar clientAssets
//Buscar nomeAtivo
//Buscar ativo na lista cliente
//Somar se ativo já presente
//Adicionar se ativo não presente
const {Asset_Customers: assetCustomers, Assets, Customers} = require('../db/models')

const getCustomerAssets = async (clientId) => {
  const customerAssets = await Customers.findOne({
    where: { id: clientId },
    include:[{model: Assets, as: 'assets', through: {attributes: ['quantity']}}]
  })
  return customerAssets
}

const buyOrder = async ({ codCliente, codAtivo, qtdeAtivo }) => {
  const customerAssets = getCustomerAssets(codCliente)
  return customerAssets
}

module.exports = {buyOrder}