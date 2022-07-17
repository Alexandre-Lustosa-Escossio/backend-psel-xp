const {Customers, Assets, Credentials} = require('../db/models')

const getCustomerAssets = async (customerId) => {
  const customerAssets = await Customers.findOne({
    where: { id: customerId },
    include:[{model: Assets, as: 'assets', through: {attributes: ['quantity']}}]
  })
  return customerAssets
}

const signInCustomer = async (payload) => {
  const { email, password } = payload
  const response = await Customers.findOne({
    where: { email },
    include: [
      {
        model: Credentials,
        as: 'credentials',
        where: { password: password }
      }
    ]
  })
  return response
}

module.exports = {getCustomerAssets, signInCustomer}