require('dotenv').config()
const axios = require('axios').default

const getAssetPrice = async (tickers) => {
  const url = `https://yfapi.net/v6/finance/quote?symbols=${tickers}.sa`
  const assetData = await axios.get(url, {
    headers: {
      'x-api-key': process.env.FINANCE_API_KEY
    }
  })
  const {result} = assetData.data.quoteResponse
  return result
}


module.exports = {getAssetPrice}