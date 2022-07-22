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


const processSellOrder = (sellOrder) => { 
  const sortedSellOrders = []
  const sortedBuyOrders = []
  for (let i = sortedBuyOrders.length - 1; i >= 0; i--) {
    if (sortedBuyOrders[i].price > sellOrder.price) {
      if (sortedBuyOrders[i].quantity < sellOrder.quantity) {
        removeBuyOrder(sortedBuyOrders, i)
        sellOrder.quantity -= sortedBuyOrders[i].quantity
      }
      else {
        removeBuyOrder(sortedBuyOrders, i)
        sortedBuyOrders[i].quantity -= sellOrder.quantity
        addBuyOrder(sortedBuyOrders, sortedBuyOrders[i])
      }
    }
    else {
      addSellOrder(sortedSellOrders)
    }
  }
}

  
