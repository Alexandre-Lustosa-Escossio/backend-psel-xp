const {Customer} = require('../db/models')
export const getById = async (id) => {
  const customer = await Customer.findOne({where: {id: id}})
  return customer
}