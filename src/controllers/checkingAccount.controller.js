const { StatusCodes } = require('http-status-codes');
const { checkingAccountService } = require('../services');

const createDepositOrder = async (req, res) => {
  const newBalance = await checkingAccountService.createDepositOrder(req.body);
  res.status(StatusCodes.OK).json(newBalance);
};

const createWithdrawalOrder = async (req, res) => {
  const newBalance = await checkingAccountService.createWithdrawalOrder(req.body);
  res.status(StatusCodes.OK).json(newBalance);
};

const getById = async (req, res) => { 
  const { codCliente } = req.params;
  const customerBalance = await checkingAccountService.getById(codCliente);
  res.status(StatusCodes.OK).json(customerBalance);
};

module.exports = { createDepositOrder, createWithdrawalOrder, getById };