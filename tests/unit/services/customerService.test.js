const chai = require('chai');
const sinon = require('sinon');
chai.use(require('sinon-chai'));
const { expect } = require('chai');
const { Customers } = require('../../../src/db/models');
const customerService = require('../../../src/services/customer.service');
const handleHashes = require('../../../src/utils/handleHashes');

const mockServiceReturn = {
  id: 1,
  assets: [{
    asset_code: 'xpbr31',
    Asset_Customers: {
      quantity: 1,
    },
  }],
};

describe('customerService getCustomerAssets method tests', function () {
  const mockModelReturn = {
    id: 1,
    assets: [{
      asset_code: 'xpbr31',
      Asset_Customers: {
        quantity: 1,
      },
    }],
  };
  let modelStub;

  beforeEach(function () {
    modelStub = sinon.stub(Customers, 'findOne').resolves(mockModelReturn);
  });

  afterEach(function () {
    sinon.restore();
  });

  it('should return customer assets', async function () {
    const customerId = 1;
    await customerService.getCustomerAssets(customerId);
    expect(modelStub.calledOnce).to.be.true;
  });

  it('should return customer assets with prices', async function () {
    const customerId = 1;
    const customerAssets = await customerService.getCustomerAssets(customerId);
    expect(customerAssets).to.deep.equal(mockServiceReturn);
  });
});

describe('customerService signInCustomer method tests', function () {
  const mockModelReturn = {
    id: 1,
    assets: [{
      asset_code: 'xpbr31',
      Asset_Customers: {
        quantity: 1,
      },
    }],
    credentials: {
      password: '123456',
    },
  };
  let modelStub;
  let hashStub;
  beforeEach(function () {
    modelStub = sinon.stub(Customers, 'findOne').returns(mockModelReturn);
    hashStub = sinon.stub(handleHashes, 'decrypt').returns(true);
  });

  afterEach(function () {
    sinon.restore();
  });

  it('should call Customers findOne method once', async function () {
    await customerService.signInCustomer({ email: '', senha: '' });
    expect(modelStub.calledOnce).to.be.true;
    expect(hashStub.calledOnce).to.be.true;
  }); 
  it('Should raise error if customer not found', async function () { 
    sinon.restore();
    sinon.stub(Customers, 'findOne').returns(null);
    try {
      await customerService.signInCustomer({ email: '', senha: '' });
    } catch (err) {
      expect(err.message).to.equal('Email ou Senha inválidos');
    }
  });
});