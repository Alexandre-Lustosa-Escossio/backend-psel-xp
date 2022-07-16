const {Customer} = require('../db/models')

const getById = async (id) => {
  const customer = await Customer.findOne({where: {id: id}})
  return customer
}

module.exports = {getById}