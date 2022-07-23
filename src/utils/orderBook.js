const { OrderBook } = require("../db/models")

const addBuyOrder = async (buyOrder) => {
  /* let indexToPutNewOrder
  for (let i = buyOrders.length - 1; i >= 0; i--){
    const buyOrder = buyOrders[i];
    if (buyOrder.price < order.price) {
      indexToPutNewOrder = i
      break;
    }
  }
  buyOrders.splice(indexToPutNewOrder,0,order) */
  await OrderBook.create(buyOrder)
}

const addSellOrder = async (sellOrder) => {
  /* let indexToPutNewOrder
  for (let i = 0; i < sellOrders.length; i++){
    const sellOrder = sellOrders[i];
    if (sellOrder.price > order.price) {
      indexToPutNewOrder = i
      break;
    }
  }
  sellOrders.splice(indexToPutNewOrder,0,order) */
  await OrderBook.create(sellOrder)
}

const removeBuyOrder = async (buyOrder) => {
  await OrderBook.destroy({ where: { id: buyOrder.id } })
}

const removeSellOrder = async (sellOrder) => {
  await OrderBook.destroy({ where: { id: sellOrder.id } })
}

module.exports = {addBuyOrder, addSellOrder, removeBuyOrder, removeSellOrder}