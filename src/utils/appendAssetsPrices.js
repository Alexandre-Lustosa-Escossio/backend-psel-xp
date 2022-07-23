const financialDataApiRequests = require('../utils/financialDataApiRequests');

const appendAssetsPrices = async ({ assets }) => {

  const assetsWithPrice = await Promise.all(assets.map(async (asset) => {
    const price = await financialDataApiRequests.getAssetPrice(asset.asset_code);
    asset.Asset_Customers.price = price;
    return asset;
  }));
  return assetsWithPrice;
};


module.exports =  appendAssetsPrices ;