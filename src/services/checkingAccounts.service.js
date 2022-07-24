const { StatusCodes } = require('http-status-codes');
const { Checking_Accounts: checkingAccount } = require('../db/models');
const raiseError = require('../utils/raiseError');
const errMsgs = require('../utils/errorMessages.json');

const handleCashBalanceScenarios = (currBalance, withdrawalAmount) => {
  if (currBalance < withdrawalAmount) {
    raiseError(StatusCodes.CONFLICT, errMsgs.notEnoughBalance);
  }
  return currBalance - withdrawalAmount;
};

const getById = async (customerId) => {
  const customerBalanceData = await checkingAccount.findOne({ where: { customer_id: customerId } });
  if (!customerBalanceData) {
    raiseError(StatusCodes.NOT_FOUND, errMsgs.customerNotFound);
  }
  return customerBalanceData;
};

const updateBalance = async (newBalance, customerId) => {
  const affectedRows = await checkingAccount.update({ balance: newBalance },
    {
      where: {
        customer_id: customerId,
      },
    });
  if (!affectedRows) {
    raiseError(StatusCodes.NOT_FOUND, errMsgs.customerNotFound)
  }
};

const createDepositOrder = async ({ CodCliente, Valor }) => {
  const customerBalanceData = await getById(CodCliente);
  const newBalance = customerBalanceData.balance + Valor;
  await updateBalance(newBalance, CodCliente);
  return { CodCliente, Valor: newBalance};
};

const createWithdrawalOrder = async ({ CodCliente, Valor }) => {
  const customerBalanceData = await getById(CodCliente);
  const newBalance = handleCashBalanceScenarios(customerBalanceData.balance, Valor);
  await updateBalance(newBalance, CodCliente);
  return {CodCliente, Valor: newBalance};
};

module.exports = { createDepositOrder, createWithdrawalOrder, getById, updateBalance, handleCashBalanceScenarios };