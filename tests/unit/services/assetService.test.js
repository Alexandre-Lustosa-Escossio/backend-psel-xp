const chai = require('chai');
const sinon = require('sinon');
chai.use(require('sinon-chai'));
const { expect } = require('chai');
const financialDataApiRequests = require('../../../src/utils/financialDataApiRequests');
const { Assets } = require('../../../src/db/models');
const assetService = require('../../../src/services/asset.service');

const mockPrice = 97.77;
const mockAssetsReturn = {
  dataValues: {
    id: 1,
    asset_code: 'xpbr31',
    asset_name: 'XP INC (BDR)',
  },
};
const codAtivo = 'xpbr31';

describe('getByCode method tests', function () {
  beforeEach(function () {
    sinon.stub(Assets, 'findOne').returns(mockAssetsReturn);
    sinon.stub(financialDataApiRequests, 'getAssetPrice').returns(mockPrice);
  });

  afterEach(function () {
    sinon.restore();
  });

  let response = {};
  
  describe('when called with no second parameter (default false)', function () {
    it('should call Assets findOne method once', async function () {
      response = await assetService.getByCode(codAtivo, false);
      expect(Assets.findOne.calledOnce).to.be.true;
    });
    it('Should return an object with the right format without the prices', async function () {
      response = await assetService.getByCode(codAtivo, false);
      expect(response.dataValues).to.be.deep.equal({ ...mockAssetsReturn.dataValues });
      expect(response.dataValues.Valor).to.be.undefined;
    });
  });

  describe('when called with true parameter', function () {
    it('should call Assets findOne and financialDataApi getAssetPrice methods once', async function () {
      await assetService.getByCode(codAtivo, true);
      expect(Assets.findOne.calledOnce).to.be.true;
      expect(financialDataApiRequests.getAssetPrice.calledOnce).to.be.true;
    });
    it('Should return an object with the right format', async function () {
      response = await assetService.getByCode(codAtivo, true);
      expect(response.dataValues).to.be.deep.equal({ ...mockAssetsReturn.dataValues, Valor: mockPrice });
    });
  });
});
