const addBuyOrder = (buyOrders,order) => {
  let indexToPutNewOrder
  for (let i = buyOrders.length - 1; i >= 0; i--){
    const buyOrder = buyOrders[i];
    if (buyOrder.price < order.price) {
      indexToPutNewOrder = i
      break;
    }
  }
  buyOrders.splice(indexToPutNewOrder,0,order)
}

const addSellOrder = (sellOrders, order) => {
  let indexToPutNewOrder
  for (let i = 0; i < sellOrders.length; i++){
    const sellOrder = sellOrders[i];
    if (sellOrder.price > order.price) {
      indexToPutNewOrder = i
      break;
    }
  }
  sellOrders.splice(indexToPutNewOrder,0,order)
}

const removeBuyOrder = (buyOrders, indexToRemove) => {
  buyOrders.splice(indexToRemove,1)
}

const removeSellOrder = (sellOrders, indexToRemove) => {
  sellOrders.splice(indexToRemove,1)
}

module.exports = {addBuyOrder, addSellOrder, removeBuyOrder, removeSellOrder}