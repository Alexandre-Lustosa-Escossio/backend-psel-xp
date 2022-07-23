const { OrderBook } = require("../db/models")

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

module.exports = {addBuyOrder, addSellOrder, removeBuyOrder, removeSellOrder}