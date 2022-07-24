const chai = require('chai');
const sinon = require('sinon');
chai.use(require('sinon-chai'));
const { expect } = require('chai');
const rewire = require('rewire'); 
const checkingAccountsService = rewire("../../../src/services/checkingAccounts.service.js");

const mockCurrBalance = { balance: 100 };
const payload = { CodCliente: 1, Valor: 50 };

describe('createDepositOrder method tests', () => {
  let getByIDStub;
  let updateBalanceStub;
  beforeEach( () => {
    getByIDStub = sinon.stub().returns(mockCurrBalance)
    updateBalanceStub = sinon.stub()
    revert = checkingAccountsService.__set__({
      "getById": getByIDStub,
      "updateBalance": updateBalanceStub,
    });
  })

  afterEach(() => {
    revert()
  });

  it('should return the payload with new balance', async () => {
    const response = await checkingAccountsService.createDepositOrder(payload)
    expect(response).to.be.deep.equal({ ...payload, Valor: payload.Valor + mockCurrBalance.balance })
  })

  it('should call stubbed methods once', async () => {
    await checkingAccountsService.createDepositOrder(payload)
    expect(getByIDStub.calledOnce).to.be.true
    expect(updateBalanceStub.calledOnce).to.be.true
  })
      
})

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