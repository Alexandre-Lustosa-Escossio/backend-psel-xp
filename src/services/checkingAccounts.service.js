const {Checking_Accounts: checkingAccount} = require('../db/models')

const createDepositOrder = async ({ CodCliente, Valor }) => {
  const customerBalanceData = await checkingAccount.findOne({where: {customer_id: CodCliente}})
  const newBalance = customerBalanceData.balance + Valor
  const newCustomerBalance = await checkingAccount.update({ balance: newBalance },
    {
      where: {
        customer_id: CodCliente
      }
    })
  return newCustomerBalance
}

module.exports = {createDepositOrder}