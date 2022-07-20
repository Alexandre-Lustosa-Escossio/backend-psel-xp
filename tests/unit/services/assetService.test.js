const chai = require('chai')
const sinon = require('sinon')
chai.use(require('sinon-chai'))
const { expect } = require('chai')
const financialDataApiRequests = require('../../../src/utils/financialDataApiRequests')
const { Assets } = require('../../../src/db/models')
const assetService = require('../../../src/services/asset.service')

const mockPrice = 97.77
const mockAssetsReturn = {
  dataValues: {
    "id": 1,
    "asset_code": "xpbr31",
    "asset_name": "XP INC (BDR)",
  }
}
const codAtivo = 'xpbr31'


describe('getByCode method tests', () => {
  
  beforeEach(() => {
    sinon.stub(Assets, 'findOne').returns(mockAssetsReturn)
    sinon.stub(financialDataApiRequests, 'getAssetPrice').returns(mockPrice)
  });

  afterEach(() => {
    sinon.restore()
  });

  let response = {}
  
  describe('when called with no second parameter (default false)', () => {
    it('should call Assets findOne method once', async () => {
      response = await assetService.getByCode(codAtivo,false)
      expect(Assets.findOne.calledOnce).to.be.true
    })
    it('Should return an object with the right format without the prices', async () => {
      response = await assetService.getByCode(codAtivo, false)
      expect(response.dataValues).to.be.deep.equal({...mockAssetsReturn.dataValues})
      expect(response.dataValues.Valor).to.be.undefined
    });
  });

  describe('when called with true parameter', () => {
    it('should call Assets findOne and financialDataApi getAssetPrice methods once', async () => {
      await assetService.getByCode(codAtivo,true)
      expect(Assets.findOne.calledOnce).to.be.true
      expect(financialDataApiRequests.getAssetPrice.calledOnce).to.be.true
    })
    it('Should return an object with the right format', async () => {
      response = await assetService.getByCode(codAtivo,true)
      expect(response.dataValues).to.be.deep.equal({...mockAssetsReturn.dataValues, Valor: mockPrice})
    })
  });
});
