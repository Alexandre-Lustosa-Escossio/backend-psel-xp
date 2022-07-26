const assetController = require('../../../src/controllers/asset.controller');
const chai = require('chai');
const sinon = require('sinon');
chai.use(require('sinon-chai'));
const { expect } = require('chai');
const { StatusCodes } = require('http-status-codes');
const assetService = require('../../../src/services/asset.service');

const mockReturn = {
  id: 1,
  asset_code: 'xpbr31',
  asset_name: 'XP INC (BDR)',
  Valor: 97.77,
};

describe('getByCode method tests', function () {
  const response = {};
  const request = {};
  
  beforeEach(function () {
    sinon.stub(assetService, 'getByCode').returns(mockReturn);
    request.params = { codAtivo: 1 };
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns(mockReturn);
  });

  afterEach(function () {
    sinon.restore();
  });

  it('should call assetService getByCode method with two parameters: codAtivo and true', async function () {
    await assetController.getByCode(request, response);
    expect(assetService.getByCode).calledOnce;
    expect(assetService.getByCode).calledWith(request.params.codAtivo, true);
  });

  it('should return status code OK and the correct asset information', async function () {
    await assetController.getByCode(request, response);
    expect(response.status).calledWith(StatusCodes.OK);
    expect(response.json).calledWith(mockReturn);
  });
});