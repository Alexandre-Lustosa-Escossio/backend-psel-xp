
const appendAssetsPrices = async ({ assets }) => {
  const assetsWithPrice = await Promise.all(assets.map(async (asset) => {
    const price = await requestPrice(asset);
    asset.Asset_Customers.price = price;
    return asset;
  }));
  return assetsWithPrice;
};


module.exports =  appendAssetsPrices ;