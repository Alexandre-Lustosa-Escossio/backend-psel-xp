const {Customers, Assets} = require('../db/models')
const getCustomerAssets = async (customerId) => {
  const customerAssets = await Customers.findOne({
    where: { id: customerId },
    include:[{model: Assets, as: 'assets', through: {attributes: ['quantity']}}]
  })
  return customerAssets
}


module.exports = {getCustomerAssets}