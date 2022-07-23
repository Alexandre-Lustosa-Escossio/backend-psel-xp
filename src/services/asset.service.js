const { Assets } = require('../db/models');
const financialDataApiRequests = require('../utils/financialDataApiRequests');
const raiseError = require('../utils/raiseError');
const errMsgs = require('../utils/errorMessages');

const getByCode = async (assetCode, includePrice = false) => {
  const asset = await Assets.findOne({ where: { asset_Code: assetCode } });
  if (!asset) {
    raiseError(StatusCodes.NOT_FOUND, errMsgs.assetNotFound);
  }
  if (includePrice) {
    asset.dataValues.Valor = await financialDataApiRequests.getAssetPrice(assetCode);
  }
  return asset;
};

module.exports = { getByCode };