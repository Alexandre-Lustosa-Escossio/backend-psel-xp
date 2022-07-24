const chai = require('chai');
const sinon = require('sinon');
chai.use(require('sinon-chai'));
const { expect } = require('chai');
const rewire = require('rewire'); 
const orderBookService = rewire("../../../src/services/orderBook.service.js");
const errMsgs = require('../../../src/utils/errorMessages.json');
const { StatusCodes } = require('http-status-codes');


let validateBuyOrderGreaterThanAllowedMock
let getSortedOrdersMock
let addBuyOrderMock
let removeSellOrderMock
let addSellOrderMock

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