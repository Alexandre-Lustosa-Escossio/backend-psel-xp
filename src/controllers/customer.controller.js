const { StatusCodes } = require('http-status-codes')
const customerService = require('../services/customer.service')

const assembleCustomerAssetsResponse = (customerAssets) => {
  const { assets, id: CodCliente } = customerAssets
  console.log(assets)
  const assembledResponse = assets.map(asset => ({
    CodCliente,
    CodAtivo: asset.asset_code,
    QtdeAtivo: asset.Asset_Customers.quantity
  }))
  return assembledResponse
}

const signInCustomer = async (req, res) => {
  const token = await customerService.signInCustomer(req.body)
  res.status(StatusCodes.OK).json({message: token})
}

const getCustomerAssets = async (req, res) => {
  const {id} = req.params 
  const customerAssets = await customerService.getCustomerAssets(id)
  const assembledResponse = assembleCustomerAssetsResponse(customerAssets)
  res.status(StatusCodes.OK).json(assembledResponse)
}

module.exports = {signInCustomer, getCustomerAssets}