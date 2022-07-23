const { removeSellOrder, removeBuyOrder, addSellOrder, addBuyOrder } = require("./orderBook")
const { OrderBook } = require("../db/models")

const makeTrade = async (order) => {
  order.side === 1 ? await processBuyOrder(order) : await processSellOrder(order)
}

const processBuyOrder = async (buyOrder) => {
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
        console.log('quantidades e preços iguais')
        await removeSellOrder(sortedSellOrders[i])
        break
      }
      else if (sortedSellOrders[i].dataValues.quantity < buyOrder.quantity) {
        console.log('quantidade de venda menor que quantidade de compra')
        await removeSellOrder(sortedSellOrders[i])
        buyOrder.quantity -= sortedSellOrders[i].dataValues.quantity
        if(!sortedSellOrders[i - 1]) {
          addBuyOrder(buyOrder)
          break
        }
      }
      else {
        console.log('quantidade de venda maior que quantidade de compra')
        await removeSellOrder(sortedSellOrders[i])
        sortedSellOrders[i].dataValues.quantity -= buyOrder.quantity
        await addSellOrder(sortedSellOrders[i].dataValues)
        break
      }
    }
    else {
      console.log('preço de venda maior que preço de compra')
      addBuyOrder(buyOrder)
      break
    }
  }
}


const processSellOrder = async (sellOrder) => { 
  const sortedBuyOrders = await OrderBook.findAll({
    where: { side: 1 },
    order: [["price", "ASC"]]
  })
  console.log(sortedBuyOrders)
  if (sortedBuyOrders.length === 0) {
    return await addSellOrder(sellOrder)
  }
  let i
  for (i = sortedBuyOrders.length - 1; i >= 0; i--) {
    if (sortedBuyOrders[i].dataValues.price >= sellOrder.price) {
      if (sortedBuyOrders[i].dataValues.quantity === sellOrder.quantity) {
        console.log('quantidades e preços iguais')
        await removeBuyOrder(sortedBuyOrders[i])
        break
      }
      else if (sortedBuyOrders[i].dataValues.quantity < sellOrder.quantity) {
        console.log('quantidade de compra menor que quantidade de venda')
        await removeBuyOrder(sortedBuyOrders[i])
        sellOrder.quantity -= sortedBuyOrders[i].dataValues.quantity
        if (!sortedBuyOrders[i - 1]) {
          addSellOrder(sellOrder)
          break
        }
      }
      else {
        console.log('quantidade de compra maior que quantidade de venda')
        await removeBuyOrder(sortedBuyOrders[i])
        sortedBuyOrders[i].dataValues.quantity -= sellOrder.quantity
        await addBuyOrder(sortedBuyOrders[i].dataValues)
        break
      }
    }
    else {
      console.log('preço de compra menor que preço de venda')
      await addSellOrder(sellOrder)
      break
    }
  }
}

  
module.exports = { makeTrade }