const chai = require('chai');
const sinon = require('sinon');
chai.use(require('sinon-chai'));
const { expect } = require('chai');
const rewire = require('rewire'); 
const { customerService } = require('../../../src/services')
const { processBuyOrder } = require('../../../src/utils/orderBookMatching')
const assetCustomerService = rewire("../../../src/services/assetCustomer.service.js");

const payload = {
  "codCliente": 1,
  "codAtivo": "xpbr31",
  "qtdeAtivo": 20
}
it('dsafsadfi', async () => {
  const createAssetInWalletMock = sinon.stub().returns('xablau3')

  assetCustomerService.__set__({
    "assembleOrderPayload": sinon.stub().returns('xablau'),
    "customerService.getCustomerAssetByAssetCode": sinon.stub().returns(null),
    "processBuyOrder": sinon.stub(),
    "createAssetInWallet": createAssetInWalletMock
  });
  
  const response = await assetCustomerService.buyOrder(payload)
  expect(response).to.equal('xablau3')
  expect(createAssetInWalletMock.calledOnce).to.be.true
})