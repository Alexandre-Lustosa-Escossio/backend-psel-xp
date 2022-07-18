const {Assets} = require('../db/models')

const getByCode = async (assetCode) => {
  const asset = await Assets.findOne({ where: { asset_Code: assetCode } })
  return asset
}

module.exports = {getByCode}