const { Assets } = require('../db/models');
const financialDataApiRequests = require('../utils/financialDataApiRequests');

const getByCode = async (assetCode, includePrice = false) => {
  const asset = await Assets.findOne({ where: { asset_Code: assetCode } });
  if (includePrice) {
    asset.dataValues.Valor = await financialDataApiRequests.getAssetPrice(assetCode);
  }
  return asset;
};

module.exports = { getByCode };