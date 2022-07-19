const chai = require('chai')
const sinon = require('sinon')
chai.use(require('sinon-chai'))
const { expect } = require('chai')
const { StatusCodes } = require('http-status-codes')
const financialDataApiRequests = require('../../../src/utils/financialDataApiRequests')
const { Assets } = require('../../../src/db/models')
const assetService = require('../../../src/services/asset.service')

const mockPrice = 97.77
const mockAssetsReturn = {
  "id": 1,
  "asset_code": "xpbr31",
  "asset_name": "XP INC (BDR)",
}

const spy = sinon.spy(sinon.stub(Assets, 'findOne').returns(mockAssetsReturn))
sinon.stub(financialDataApiRequests, 'getAssetPrice').returns(mockPrice)

describe('getByCode method tests', () => {
  const codAtivo = 1
  describe('when called with true parameter', () => {
    it('Should return an object with the right format', async () => {
      const response = await assetService.getByCode(codAtivo,true)
      expect(response).to.be.deep.equal({...mockAssetsReturn, Valor: mockPrice})
    })
  });
  /* describe('when called with no second parameter (default false)', () => {
    it('Should return an object with the right format without the prices', async () => {
      const response2 = await assetService.getByCode(codAtivo, false)
      expect(response2).to.be.deep.equal(mockAssetsReturn)
      expect(response2.Valor).to.be.undefined
    });
  }); */
});
