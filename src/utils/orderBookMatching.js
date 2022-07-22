const { removeSellOrder, removeBuyOrder, addSellOrder, addBuyOrder } = require("./orderBook")

const makeTrade = (order) => {
  order.side === 1 ? processBuyOrder(order) : processSellOrder(order)
}

const processBuyOrder = (buyOrder) => {
  const sortedSellOrders = []
  const sortedBuyOrders = []
  for (let i = sortedSellOrders.length - 1; i >= 0; i--) {
    if (sortedSellOrders[i].price < buyOrder.price) {
      if (sortedSellOrders[i].quantity < buyOrder.quantity) {
        removeSellOrder(sortedSellOrders, i)
        buyOrder.quantity -= sortedSellOrders[i].quantity
      }
      else {
        removeSellOrder(sortedSellOrders, i)
        sortedSellOrders[i].quantity -= buyOrder.quantity
        addSellOrder(sortedSellOrders, sortedSellOrders[i])
      }
    }
    else {
      addBuyOrder(sortedBuyOrders)
    }
  }
}


  
