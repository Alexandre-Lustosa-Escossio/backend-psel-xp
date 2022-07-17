//Buscar clientAssets
//Buscar nomeAtivo
//Buscar ativo na lista cliente
//Somar se ativo já presente
//Adicionar se ativo não presente
const {Asset_Customers: assetCustomers} = require('../db/models')
const buyOrder = async ({ codCliente, codAtivo, qtdeAtivo }) => {
  const customerAssets =  await assetCustomers.findAll()
  return customerAssets
}

module.exports = {buyOrder}