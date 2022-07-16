//Buscar clientAssets
//Buscar nomeAtivo
//Buscar ativo na lista cliente
//Somar se ativo já presente
//Adicionar se ativo não presente
const customerService = require('./customer.service')
const buyOrder = async ({ codCliente, codAtivo, qtdeAtivo }) => {
  const clientAssets = await customerService.getById(codCliente)
  return clientAssets
}

module.exports = {buyOrder}