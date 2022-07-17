const {Assets} = require('../db/models')
const getByCode = async (assetCode) => {
  const assetId = await Assets.findOne({ where: { asset_Code: assetCode } })
  return assetId
}

module.exports = {getByCode}