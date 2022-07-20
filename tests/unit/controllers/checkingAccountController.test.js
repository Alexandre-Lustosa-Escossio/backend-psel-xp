const chai = require('chai')
const sinon = require('sinon')
chai.use(require('sinon-chai'))
const { expect } = require('chai')
const { StatusCodes } = require('http-status-codes')
const financialDataApiRequests = require('../../../src/utils/financialDataApiRequests')
const { Assets } = require('../../../src/db/models')
const { checkingAccountController } = require('../../../src/controllers')
const { checkingAccountService } = require('../../../src/services')

describe.skip('createDepositOrder tests', () => {
  const response = {}
  const request = {}
  
  beforeEach(() => {
    sinon.stub(checkingAccountService, 'createDepositOrder')
    request.body = {codCliente: 1, Valor: 500}
    response.status = sinon.stub().returns(response)
    response.json = sinon.stub().returns()
  });

  afterEach(() => {
    sinon.restore()
  });

  it('should call checkingAccountService createDepositOrder method once with correct parameters', async () => {
    await checkingAccountController.createDepositOrder(request, response)
    expect(checkingAccountService.createDepositOrder.calledOnce).to.be.true;
    expect(checkingAccountService.createDepositOrder.calledWith(request.body)).to.be.true;
  });
  
  it('should return status code OK and an empty response', async () => {
    await checkingAccountController.createDepositOrder(request, response)
    expect(response.status).calledWith(StatusCodes.OK);
    expect(response.json).calledWith()
  });

});

describe.skip('createWithdrawalOrder tests', () => {
  const response = {}
  const request = {}

  beforeEach(() => {
    sinon.stub(checkingAccountService, 'createWithdrawalOrder')
    request.body = {codCliente: 1, Valor: 500}
    response.status = sinon.stub().returns(response)
    response.json = sinon.stub().returns()
  });

  afterEach(() => {
    sinon.restore()
  });

  it('should call checkingAccountService createDepositOrder method once with correct parameters', async () => {
    await checkingAccountController.createWithdrawalOrder(request, response)
    expect(checkingAccountService.createWithdrawalOrder.calledOnce).to.be.true;
    expect(checkingAccountService.createWithdrawalOrder.calledWith(request.body)).to.be.true;
  });
  
  it('should return status code OK and an empty response', async () => {
    await checkingAccountController.createWithdrawalOrder(request, response)
    expect(response.status).calledWith(StatusCodes.OK);
    expect(response.json).calledWith()
  });
});
