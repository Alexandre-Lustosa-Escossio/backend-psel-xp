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

  let getByIDStub;
  let updateBalanceStub;
  let handleCashBalanceScenariosStub
  const newBalance = payload.Valor + mockCurrBalance.balance
  beforeEach(() => {
    getByIDStub = sinon.stub().returns(mockCurrBalance)
    updateBalanceStub = sinon.stub()
    handleCashBalanceScenariosStub = sinon.stub().returns(newBalance)
    revert = checkingAccountsService.__set__({
      "getById": getByIDStub,
      "updateBalance": updateBalanceStub,
      "handleCashBalanceScenarios": handleCashBalanceScenariosStub,
    });
  })

  afterEach(() => {
    revert()
  });

  it('should return the payload with the new balance', async function () {
    const response = await checkingAccountsService.createWithdrawalOrder(payload);
    expect(response).to.be.deep.equal({...payload, Valor: newBalance});
  });
  
  it('should stubbed methods once', async function () {
    await checkingAccountsService.createWithdrawalOrder(payload);
    expect(getByIDStub.calledOnce).to.be.true;
    expect(handleCashBalanceScenariosStub.calledOnce).to.be.true
    expect(updateBalanceStub.calledOnce).to.be.true;
  });

});