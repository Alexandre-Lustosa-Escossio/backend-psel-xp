const chai = require('chai');
const sinon = require('sinon');
chai.use(require('sinon-chai'));
const { expect } = require('chai');
const { checkingAccountService } = require('../../../src/services');
const { Checking_Accounts: checkingAccount } = require('../../../src/db/models');

const mockReturn = [1];
const findOneMockReturn = { balance: 100 };
const payload = { CodCliente: 1, Valor: 50 };

describe('createDepositOrder method tests', function () {
  let findOneStub;
  let updateStub;
  beforeEach(function () {
    findOneStub = sinon.stub(checkingAccount, 'findOne').returns(findOneMockReturn);
    updateStub = sinon.stub(checkingAccount, 'update').returns(mockReturn);
  });

  afterEach(function () {
    sinon.restore();
  });

  it('should call findById and updateBalance methods once', async function () {
    await checkingAccountService.createDepositOrder(payload);
    expect(findOneStub.calledOnce).to.be.true;
    expect(updateStub.calledOnce).to.be.true;
  });

  it('should return the value returned by updateBalance method ', async function () {
    const response = await checkingAccountService.createDepositOrder(payload);
    expect(response).to.be.deep.equal(mockReturn);
  });
});

describe('createWithdrawalOrder method tests', function () {
  let findOneStub;
  let updateStub;

  beforeEach(function () {
    findOneStub = sinon.stub(checkingAccount, 'findOne').returns(findOneMockReturn);
    updateStub = sinon.stub(checkingAccount, 'update').returns(mockReturn);
  });

  afterEach(function () {
    sinon.restore();
  });
  
  it('should call findById, handleCashBalanceScenarios and updateBalance methods once', async function () {
    await checkingAccountService.createDepositOrder(payload);
    expect(findOneStub.calledOnce).to.be.true;
    expect(updateStub.calledOnce).to.be.true;
  });

  it('should return the value returned by updateBalance', async function () {
    const response = await checkingAccountService.createDepositOrder(payload);
    expect(response).to.be.deep.equal(mockReturn);
  });
});