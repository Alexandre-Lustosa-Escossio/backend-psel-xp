const { StatusCodes } = require("http-status-codes")
const { checkingAccountService } = require("../services")


const createDepositOrder = async (req, res) => {
  await checkingAccountService.createDepositOrder(req.body)
  res.status(StatusCodes.OK).json()
}

module.exports = {createDepositOrder}