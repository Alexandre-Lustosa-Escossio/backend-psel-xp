const { OrderBook } = require("../db/models")
const raiseError = require("../utils/raiseError")
const { StatusCodes } = require("http-status-codes")
const errMsgs = require('../utils/errorMessages.json')


const addBuyOrder = async (buyOrder) => {
  await OrderBook.create(buyOrder)
}

const addSellOrder = async (sellOrder) => {
  await OrderBook.create(sellOrder)
}

const removeBuyOrder = async (buyOrder) => {
  await OrderBook.destroy({ where: { id: buyOrder.id } })
}

const removeSellOrder = async (sellOrder) => {
  await OrderBook.destroy({ where: { id: sellOrder.id } })
}

const getAllWithTargetPrice = async (side, assetId) => {
  const orderPlacementsAtPrice = await OrderBook.findAll({
    where: {
      side,
      asset_id: assetId
    }
  })
  return orderPlacementsAtPrice
}

const validateBuyGreaterThanAllowed = async (buyOrder) => {
  const orderPlacementsAtPrice = await getAllWithTargetPrice(0, buyOrder.asset_id)
  const totalSellQuantity = orderPlacementsAtPrice.reduce((acc, curr) => {
    return acc + curr.quantity
  }, 0)
  if(buyOrder.quantity > totalSellQuantity) {
    raiseError(StatusCodes.CONFLICT, errMsgs.quantityTooHigh)
  }
}

const getSortedOrders = async (side, assetId) => {
  const sortedOrders = await OrderBook.findAll({
    where: {
      side,
      asset_id: assetId,
    },
    order: [["price", "DESC"]]
  })
  return sortedOrders
}

const processBuyOrder = async (buyOrder) => {
  await validateBuyGreaterThanAllowed(buyOrder)
  buyOrder.side = 1
  const sortedSellOrders = await getSortedOrders(0, buyOrder.asset_id)
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
    where: {
      side: 1,
      asset_id: sellOrder.asset_id,
    },
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