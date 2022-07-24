const chai = require('chai');
const sinon = require('sinon');
chai.use(require('sinon-chai'));
const { expect } = require('chai');
const rewire = require('rewire'); 
const orderBookService = rewire("../../../src/services/orderBook.service.js");
const errMsgs = require('../../../src/utils/errorMessages.json');
const { StatusCodes } = require('http-status-codes');


let validateBuyGreaterThanAllowedMock
let getSortedOrdersMock
let addBuyOrderMock
let removeSellOrderMock
let addSellOrderMock
let removeBuyOrderMock

describe('processBuyOrder tests', () => {

  describe('when buyOrder price is greater than sellOrder price', () => {
      
    beforeEach(() => {
      validateBuyGreaterThanAllowedMock = sinon.stub()
      getSortedOrdersMock = sinon.stub().returns([{ dataValues: { quantity: 20, price: 20 } }])
      addBuyOrderMock = sinon.stub()
      removeSellOrderMock = sinon.stub()
      addSellOrderMock = sinon.stub()
      revert = orderBookService.__set__({
        "validateBuyGreaterThanAllowed": validateBuyGreaterThanAllowedMock,
        "getSortedOrders": getSortedOrdersMock,
        "addBuyOrder": addBuyOrderMock,
        "removeSellOrder": removeSellOrderMock,
        "addSellOrder": addSellOrderMock
      });
    })
    afterEach(() => {
      revert()
    });

    describe('when quantity matches', () => {
      it('should call validateBuyOrderGreaterThanAllow, getSortedOrders and removeSellOrder', async () => {
        const buyOrder = { price: 20, quantity:20 }
        await orderBookService.processBuyOrder(buyOrder)
        expect(validateBuyGreaterThanAllowedMock.calledOnce).to.be.true
        expect(getSortedOrdersMock.calledOnce).to.be.true
        expect(removeSellOrderMock.calledOnce).to.be.true
      })
    })

    describe('when quantity of buy is greater than quantity of sell, and theres no other order that matches that price', () => {
      it('should call validateBuyOrderGreaterThanAllow, getSortedOrders, removeSellOrder and addBuyOrderMock', async () => {
        const buyOrder = { price: 20, quantity:30 }
        await orderBookService.processBuyOrder(buyOrder)
        expect(validateBuyGreaterThanAllowedMock.calledOnce).to.be.true
        expect(getSortedOrdersMock.calledOnce).to.be.true
        expect(removeSellOrderMock.calledOnce).to.be.true
        expect(addBuyOrderMock.calledOnce).to.be.true
      })
    })

    describe('when quantity of buy is lesser than quantity of sell', () => {
      it('should call validateBuyOrderGreaterThanAllow, getSortedOrders, removeSellOrder and addBuyOrderMock', async () => {
        const buyOrder = { price: 20, quantity:10 }
        await orderBookService.processBuyOrder(buyOrder)
        expect(validateBuyGreaterThanAllowedMock.calledOnce).to.be.true
        expect(getSortedOrdersMock.calledOnce).to.be.true
        expect(removeSellOrderMock.calledOnce).to.be.true
        expect(addSellOrderMock.calledOnce).to.be.true
      })
    })
  })

  describe('when buyOrder price is lesser than sellOrder price', () => {
      
    beforeEach(() => {
      validateBuyGreaterThanAllowedMock = sinon.stub()
      getSortedOrdersMock = sinon.stub().returns([{ dataValues: { quantity: 20, price: 20 } }])
      addBuyOrderMock = sinon.stub()
      removeSellOrderMock = sinon.stub()
      addSellOrderMock = sinon.stub()
      revert = orderBookService.__set__({
        "validateBuyGreaterThanAllowed": validateBuyGreaterThanAllowedMock,
        "getSortedOrders": getSortedOrdersMock,
        "addBuyOrder": addBuyOrderMock,
        "removeSellOrder": removeSellOrderMock,
        "addSellOrder": addSellOrderMock
      });
    })
    afterEach(() => {
      revert()
    });

    it('should call validateBuyOrderGreaterThanAllow, getSortedOrders and removeSellOrder', async () => {
      const buyOrder = { price: 10, quantity: 20 }
      await orderBookService.processBuyOrder(buyOrder)
      expect(addBuyOrderMock.calledOnce).to.be.true
    })
  })
})


describe('processSellOrder tests', () => {

  describe('when theres no buy order placed', () => {
      
    beforeEach(() => {
      getSortedOrdersMock = sinon.stub().returns([])
      addSellOrderMock = sinon.stub()
      revert = orderBookService.__set__({
        "getSortedOrders": getSortedOrdersMock,
        "addSellOrder": addSellOrderMock
      });
    })
    afterEach(() => {
      revert()
    });
    it('should call getSortedOrders and addSellOrder', async () => {
      const sellOrder = { price: 20, quantity: 20 }
      await orderBookService.processSellOrder(sellOrder)
      expect(getSortedOrdersMock.calledOnce).to.be.true
      expect(addSellOrderMock.calledOnce).to.be.true
    })
  })

  describe('when sell order price is equal or lesser than buy order price', () => {
      
    beforeEach(() => {
      getSortedOrdersMock = sinon.stub().returns([{ dataValues: { price: 20, quantity: 20 } }])
      addSellOrderMock = sinon.stub()
      removeBuyOrderMock = sinon.stub()
      addBuyOrderMock = sinon.stub()
      revert = orderBookService.__set__({
        "getSortedOrders": getSortedOrdersMock,
        "addSellOrder": addSellOrderMock,
        "removeBuyOrder": removeBuyOrderMock,
        "addBuyOrder": addBuyOrderMock
      });
    })
    afterEach(() => {
      revert()
    });

    describe('when quantities match', () => {
      it('should call getSortedOrders and RemoveBuyOrder', async () => {
        const sellOrder = { price: 20, quantity: 20 }
        await orderBookService.processSellOrder(sellOrder)
        expect(getSortedOrdersMock.calledOnce).to.be.true
        expect(removeBuyOrderMock.calledOnce).to.be.true
      })
    })

    describe('when sell order quantity is greater than buy order quantity and theres no other buy order placed', async () => {
      it('should call getSortedOrders and RemoveBuyOrder', async () => {
        const sellOrder = { price: 20, quantity: 30 }
        await orderBookService.processSellOrder(sellOrder)
        expect(getSortedOrdersMock.calledOnce).to.be.true
        expect(removeBuyOrderMock.calledOnce).to.be.true
        expect(addSellOrderMock.calledOnce).to.be.true
      })
    })

    describe('when sell order quantity is lesser than buy order quantity', async () => {
      it('should call getSortedOrders,RemoveBuyOrder and addBuyOrder', async () => {
        const sellOrder = { price: 20, quantity: 10 }
        await orderBookService.processSellOrder(sellOrder)
        expect(getSortedOrdersMock.calledOnce).to.be.true
        expect(removeBuyOrderMock.calledOnce).to.be.true
        expect(addBuyOrderMock.calledOnce).to.be.true
      })
    })
  })

  describe('when prices dont match', () => {
    beforeEach(() => {
      getSortedOrdersMock = sinon.stub().returns([])
      addSellOrderMock = sinon.stub()
      revert = orderBookService.__set__({
        "getSortedOrders": getSortedOrdersMock,
        "addSellOrder": addSellOrderMock
      });
    })
    afterEach(() => {
      revert()
    });

    it('should call getSortedOrders and addSellOrder', async () => {
      const sellOrder = { price: 30, quantity: 20 }
      await orderBookService.processSellOrder(sellOrder)
      expect(getSortedOrdersMock.calledOnce).to.be.true
      expect(addSellOrderMock.calledOnce).to.be.true
    })
  })

})
