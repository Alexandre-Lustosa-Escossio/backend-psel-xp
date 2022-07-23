const { removeSellOrder, removeBuyOrder, addSellOrder, addBuyOrder } = require("./orderBook")
const { OrderBook } = require("../db/models")

const processBuyOrder = async (buyOrder) => {
  buyOrder.side = 1
  const sortedSellOrders = await OrderBook.findAll({
    where: { side: 0 },
    order: [["price", "DESC"]]
  })
  if (sortedSellOrders.length === 0) {
    return await addBuyOrder(buyOrder)
  }
  let i
  for (i = sortedSellOrders.length - 1; i >= 0; i--) {
    if (sortedSellOrders[i].dataValues.price <= buyOrder.price) {
      if (sortedSellOrders[i].dataValues.quantity === buyOrder.quantity) {
        await removeSellOrder(sortedSellOrders[i])
        break
      }
      else if (sortedSellOrders[i].dataValues.quantity < buyOrder.quantity) {
        await removeSellOrder(sortedSellOrders[i])
        buyOrder.quantity -= sortedSellOrders[i].dataValues.quantity
        if(!sortedSellOrders[i - 1]) {
          addBuyOrder(buyOrder)
          break
        }
      }
      else {
        await removeSellOrder(sortedSellOrders[i])
        sortedSellOrders[i].dataValues.quantity -= buyOrder.quantity
        await addSellOrder(sortedSellOrders[i].dataValues)
        break
      }
    }
    else {
      addBuyOrder(buyOrder)
      break
    }
  }
}


const processSellOrder = async (sellOrder) => { 
  sellOrder.side = 0
  const sortedBuyOrders = await OrderBook.findAll({
    where: { side: 1 },
    order: [["price", "ASC"]]
  })
  if (sortedBuyOrders.length === 0) {
    return await addSellOrder(sellOrder)
  }
  let i
  for (i = sortedBuyOrders.length - 1; i >= 0; i--) {
    if (sortedBuyOrders[i].dataValues.price >= sellOrder.price) {
      if (sortedBuyOrders[i].dataValues.quantity === sellOrder.quantity) {
        await removeBuyOrder(sortedBuyOrders[i])
        break
      }
      else if (sortedBuyOrders[i].dataValues.quantity < sellOrder.quantity) {
        await removeBuyOrder(sortedBuyOrders[i])
        sellOrder.quantity -= sortedBuyOrders[i].dataValues.quantity
        if (!sortedBuyOrders[i - 1]) {
          addSellOrder(sellOrder)
          break
        }
      }
      else {
        await removeBuyOrder(sortedBuyOrders[i])
        sortedBuyOrders[i].dataValues.quantity -= sellOrder.quantity
        await addBuyOrder(sortedBuyOrders[i].dataValues)
        break
      }
    }
    else {
      await addSellOrder(sellOrder)
      break
    }
  }
}

  
module.exports = { processBuyOrder, processSellOrder }