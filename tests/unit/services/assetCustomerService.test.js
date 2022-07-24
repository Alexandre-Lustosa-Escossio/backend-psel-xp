const chai = require('chai');
const sinon = require('sinon');
chai.use(require('sinon-chai'));
const { expect } = require('chai');
const rewire = require('rewire'); 
const assetCustomerService = rewire("../../../src/services/assetCustomer.service.js");

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
    const totalAssetsAfterSell = 30

    beforeEach(() => {
      assembleOrderPayloadMock = sinon.stub()
      getCustomerAssetByAssetCodeMock = sinon.stub().returns('not null')
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

    it('should return payload with new quantity of assets', async () => {
      const response = await assetCustomerService.buyOrder(payload)
      expect(response).to.be.deep.equal({...payload, qtdeAtivo: totalAssetsAfterSell})
    })

    it('should call the stubbed methods once', async () => {
      await assetCustomerService.buyOrder(payload)
      expect(assembleOrderPayloadMock.calledOnce).to.be.true
      expect(getCustomerAssetByAssetCodeMock.calledOnce).to.be.true
      expect(transactionMock.calledOnce).to.be.true
    })

  });
});