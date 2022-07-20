require('dotenv').config();
const axios = require('axios').default;

const getAssetPrice = async (tickers) => {
  const url = `https://yfapi.net/v6/finance/quote?symbols=${tickers}.sa`;
  const assetData = await axios.get(url, {
    headers: {
      'x-api-key': process.env.FINANCE_API_KEY,
    },
  });
  const { regularMarketPrice } = assetData.data.quoteResponse.result[0];
  return regularMarketPrice;
};

module.exports = { getAssetPrice };