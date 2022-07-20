const chai = require('chai');
const sinon = require('sinon');
chai.use(require('sinon-chai'));
const { expect } = require('chai');
const { Customers } = require('../../../src/db/models');
const financialDataApiRequests = require('../../../src/utils/financialDataApiRequests');
const customerService = require('../../../src/services/customer.service');
const tokenGenerator = require('../../../src/utils/tokenGenerator');

const mockModelReturn = {
  id: 1,
  assets: [{
    asset_code: 'xpbr31',
    Asset_Customers: {
      quantity: 1,
    },
  }],
};

const mockFinanceApiReturn = 100;

const mockServiceReturn = {
  id: 1,
  assets: [{
    asset_code: 'xpbr31',
    Asset_Customers: {
      quantity: 1,
      price: mockFinanceApiReturn,
    },
  }],
};

describe('customerService getCustomerAssets method tests', function () {
  let modelStub;
  let financeApiStub;

  beforeEach(function () {
    modelStub = sinon.stub(Customers, 'findOne').resolves(mockModelReturn);
    financeApiStub = sinon.stub(financialDataApiRequests, 'getAssetPrice').resolves(mockFinanceApiReturn);
  });

  afterEach(function () {
    sinon.restore();
  });

  it('should return customer assets', async function () {
    const customerId = 1;
    await customerService.getCustomerAssets(customerId);
    expect(modelStub.calledOnce).to.be.true;
    expect(financeApiStub.calledOnce).to.be.true;
  });

  it('should return customer assets with prices', async function () {
    const customerId = 1;
    const customerAssets = await customerService.getCustomerAssets(customerId);
    expect(customerAssets).to.deep.equal(mockServiceReturn);
  });
});

describe('customerService signInCustomer method tests', function () {
  let modelStub;
  beforeEach(function () {
    modelStub = sinon.stub(Customers, 'findOne').returns(mockModelReturn);
  });

  afterEach(function () {
    sinon.restore();
  });

  it('should call Customers findOne method once', async function () {
    await customerService.signInCustomer({ email: '', password: '' });
    expect(modelStub.calledOnce).to.be.true;
  }); 
  it('Should raise error if customer not found', async function () { 
    sinon.restore();
    sinon.stub(Customers, 'findOne').returns(null);
    try {
      await customerService.signInCustomer({ email: '', password: '' });
    } catch (err) {
      expect(err.message).to.equal('Email ou Senha inválidos');
    }
  });
});