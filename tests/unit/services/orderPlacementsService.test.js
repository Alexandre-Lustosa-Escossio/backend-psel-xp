const chai = require('chai');
const sinon = require('sinon');
chai.use(require('sinon-chai'));
const { expect } = require('chai');
const { Order_Placements: orderPlacement } = require('../../../src/db/models');
const financialDataApiRequest = require('../../../src/utils/financialDataApiRequests');
const orderPlacementsService = require('../../../src/services/orderPlacements.service');
const assetService = require('../../../src/services/asset.service');

describe('orderPlacements createSellOrder method tests', function () { 
  let modelStub;
  let financeApiStub;
  beforeEach(function () { 
    modelStub = sinon.stub(orderPlacement, 'create').resolves();
    financeApiStub = sinon.stub(financialDataApiRequest, 'getAssetPrice').resolves();
  });
  afterEach(function () { 
    sinon.restore();
  });
  it('should call getAssetPrice and Create methods once', async function () {
    const payload = { codAtivo: 'ABC', qtdeAtivo: 1, codCliente: 1 };
    await orderPlacementsService.createSellOrder(payload, 1);
    expect(modelStub.calledOnce).to.be.true;
    expect(financeApiStub.calledOnce).to.be.true;
  });
});

describe('orderPlacements createBuyOrder method tests', function () { 
  let modelStub;
  let financeApiStub;
  let assetServiceStub;
  beforeEach(function () {
    modelStub = modelStub = sinon.stub(orderPlacement, 'create').resolves();
    financeApiStub = financeApiStub = sinon.stub(financialDataApiRequest, 'getAssetPrice').resolves();
    assetServiceStub = assetServiceStub = sinon.stub(assetService, 'getByCode').resolves({ id: 1 });
  });
  afterEach(function () {
    sinon.restore();
  });
  it('should call getAssetPrice, getByCode and Create methods once', async function () {
    const payload = { codAtivo: 'ABC', qtdeAtivo: 1, codCliente: 1 };
    await orderPlacementsService.createBuyOrder(payload);
    expect(modelStub.calledOnce).to.be.true;
    expect(financeApiStub.calledOnce).to.be.true;
    expect(assetServiceStub.calledOnce).to.be.true;
  });
});