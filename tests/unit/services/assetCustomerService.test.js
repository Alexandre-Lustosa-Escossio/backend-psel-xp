const chai = require('chai');
const sinon = require('sinon');
chai.use(require('sinon-chai'));
const { expect } = require('chai');
const rewire = require('rewire'); 
const assetCustomerService = rewire("../../../src/services/assetCustomer.service.js");
const errMsgs = require('../../../src/utils/errorMessages.json');
const { StatusCodes } = require('http-status-codes');

const payload = {
  "codCliente": 1,
  "codAtivo": "xpbr31",
  "qtdeAtivo": 20
}
let createAssetInWalletMock
let assembleOrderPayloadMock
let getCustomerAssetByAssetCodeMock
let processBuyOrderMock
let transactionMock
let revert

describe('buyOrder tests', () => {
  
  
  describe('when customer doesnt have the asset in wallet', () => {
      
    beforeEach(() => {
      createAssetInWalletMock = sinon.stub().returns(payload)
      assembleOrderPayloadMock = sinon.stub()
      getCustomerAssetByAssetCodeMock = sinon.stub().returns(null)
      processBuyOrderMock = sinon.stub()
      revert = assetCustomerService.__set__({
        "assembleOrderPayload": assembleOrderPayloadMock,
        "customerService.getCustomerAssetByAssetCode": getCustomerAssetByAssetCodeMock,
        "processBuyOrder": processBuyOrderMock,
        "createAssetInWallet": createAssetInWalletMock
        });
      })
      afterEach(() => {
        revert()
      });
    
    it('should return exact payload sent when customer doesnt have the asset in wallet', async () => {
      const response = await assetCustomerService.buyOrder(payload)
      expect(createAssetInWalletMock.calledOnce).to.be.true
      expect(response).to.be.deep.equal(payload)
    })
    it('should call all stubbed methods once', async () => {
      await assetCustomerService.buyOrder(payload)
      expect(assembleOrderPayloadMock.calledOnce).to.be.true
      expect(getCustomerAssetByAssetCodeMock.calledOnce).to.be.true
      expect(processBuyOrderMock.calledOnce).to.be.true
      expect(createAssetInWalletMock.calledOnce).to.be.true
    })
  })
  
  describe('when customer already has asset in wallet', () => {
    const totalAssetsAfterBuy = 30

    beforeEach(() => {
      assembleOrderPayloadMock = sinon.stub()
      getCustomerAssetByAssetCodeMock = sinon.stub().returns('not null')
      transactionMock = sinon.stub().returns(totalAssetsAfterBuy)
      revert = assetCustomerService.__set__({
        "assembleOrderPayload": assembleOrderPayloadMock,
        "customerService.getCustomerAssetByAssetCode": getCustomerAssetByAssetCodeMock,
        "sequelize.transaction": transactionMock
        });
    })
    
    afterEach(() => {
      revert()
    });

    it('should return payload with new quantity of assets', async () => {
      const response = await assetCustomerService.buyOrder(payload)
      expect(response).to.be.deep.equal({...payload, qtdeAtivo: totalAssetsAfterBuy})
    })

    it('should call the stubbed methods once', async () => {
      await assetCustomerService.buyOrder(payload)
      expect(assembleOrderPayloadMock.calledOnce).to.be.true
      expect(getCustomerAssetByAssetCodeMock.calledOnce).to.be.true
      expect(transactionMock.calledOnce).to.be.true
    })

  });
});


describe('sellOrder tests', () => {
  
  describe('when customer doesnt have the asset in wallet', () => {
      
    beforeEach(() => {
      assembleOrderPayloadMock = sinon.stub()
      getCustomerAssetByAssetCodeMock = sinon.stub().returns(null)
      revert = assetCustomerService.__set__({
        "assembleOrderPayload": assembleOrderPayloadMock,
        "customerService.getCustomerAssetByAssetCode": getCustomerAssetByAssetCodeMock,
      });
    })
    afterEach(() => {
      revert()
    });
    
    it('should throw an error saying client doesnt have the asset to sell', async () => {
      await assetCustomerService.sellOrder(payload).catch(e =>
        expect(e).to.be.an('error').with.property('message', errMsgs.youDontHaveThatAsset))
      await assetCustomerService.sellOrder(payload).catch(e =>
        expect(e).to.be.an('error').with.property('status', StatusCodes.NOT_ACCEPTABLE)) 
    })

    it('should call all stubbed methods once', async () => {
      await assetCustomerService.sellOrder(payload).catch(e => {  
        expect(assembleOrderPayloadMock.calledOnce).to.be.true
        expect(getCustomerAssetByAssetCodeMock.calledOnce).to.be.true
      })
    })
  })

  describe('when customer doesnt have enought asset quantity', () => {

    beforeEach(() => {
      assembleOrderPayloadMock = sinon.stub()
      getCustomerAssetByAssetCodeMock = sinon.stub().returns({assets: [{Asset_Customers: {quantity: 10}}]})
      revert = assetCustomerService.__set__({
        "assembleOrderPayload": assembleOrderPayloadMock,
        "customerService.getCustomerAssetByAssetCode": getCustomerAssetByAssetCodeMock,
      });
    })
    afterEach(() => {
      revert()
    });
    
    it('should throw an error saying client doest have enough asset quantity to sell', async () => {
      await assetCustomerService.sellOrder(payload).catch(e =>
        expect(e).to.be.an('error').with.property('message', errMsgs.notEnoughAssetQuantity))
      await assetCustomerService.sellOrder(payload).catch(e =>
        expect(e).to.be.an('error').with.property('status', StatusCodes.NOT_ACCEPTABLE))       
    });

    it('should call all stubbed methods once', async () => {
      await assetCustomerService.sellOrder(payload).catch(e => {  
        expect(assembleOrderPayloadMock.calledOnce).to.be.true
        expect(getCustomerAssetByAssetCodeMock.calledOnce).to.be.true
      })
    })
  });

  describe('when everything is ok', () => {
    const totalAssetsAfterSell = 30
    beforeEach(() => {
      assembleOrderPayloadMock = sinon.stub()
      getCustomerAssetByAssetCodeMock = sinon.stub().returns({assets: [{Asset_Customers: {quantity: 50}}]})
      transactionMock = sinon.stub().returns(totalAssetsAfterSell)
      revert = assetCustomerService.__set__({
        "assembleOrderPayload": assembleOrderPayloadMock,
        "customerService.getCustomerAssetByAssetCode": getCustomerAssetByAssetCodeMock,
        "sequelize.transaction": transactionMock 
      });
    })
    afterEach(() => {
      revert()
    });
    
    it('should return the payload with the new quantity of assets after sell', async () => {
      const response = await assetCustomerService.sellOrder(payload)
      expect(response).to.be.deep.equal({...payload, qtdeAtivo: totalAssetsAfterSell})
    });

    it('should call all stubbed methods once', async () => {
      await assetCustomerService.sellOrder(payload)
      expect(assembleOrderPayloadMock.calledOnce).to.be.true
      expect(getCustomerAssetByAssetCodeMock.calledOnce).to.be.true
      expect(transactionMock.calledOnce).to.be.true
    })
  });


})