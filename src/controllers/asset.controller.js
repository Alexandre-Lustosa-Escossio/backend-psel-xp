const { StatusCodes } = require('http-status-codes');
const { assetService } = require('../services');

const getByCode = async (req, res) => {
  const { codAtivo } = req.params;
  const assetData = await assetService.getByCode(codAtivo, true);
  res.status(StatusCodes.OK).json(assetData);
};

module.exports = { getByCode };