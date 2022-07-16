const {Assets} = require('../db/models')
const getByName = async (assetName) => {
  const assetId = await Assets.findOne({ where: { asset_name: assetName } })
  return assetId
}

module.exports = {getByName}