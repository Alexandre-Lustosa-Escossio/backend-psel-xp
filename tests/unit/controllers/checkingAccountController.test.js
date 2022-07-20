const chai = require('chai');
const sinon = require('sinon');
chai.use(require('sinon-chai'));
const { expect } = require('chai');
const { StatusCodes } = require('http-status-codes');
const { checkingAccountController } = require('../../../src/controllers');
const { checkingAccountService } = require('../../../src/services');

describe('createDepositOrder tests', function () {
  const response = {};
  const request = {};
  
  beforeEach(function () {
    sinon.stub(checkingAccountService, 'createDepositOrder');
    request.body = { codCliente: 1, Valor: 500 };
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
  });

  afterEach(function () {
    sinon.restore();
  });

  it('should call checkingAccountService createDepositOrder method once with correct parameters', async function () {
    await checkingAccountController.createDepositOrder(request, response);
    expect(checkingAccountService.createDepositOrder.calledOnce).to.be.true;
    expect(checkingAccountService.createDepositOrder.calledWith(request.body)).to.be.true;
  });
  
  it('should return status code OK and an empty response', async function () {
    await checkingAccountController.createDepositOrder(request, response);
    expect(response.status).calledWith(StatusCodes.OK);
    expect(response.json).calledWith();
  });
});

describe('createWithdrawalOrder tests', function () {
  const response = {};
  const request = {};

  beforeEach(function () {
    sinon.stub(checkingAccountService, 'createWithdrawalOrder');
    request.body = { codCliente: 1, Valor: 500 };
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
  });

  afterEach(function () {
    sinon.restore();
  });

  it('should call checkingAccountService createDepositOrder method once with correct parameters', async function () {
    await checkingAccountController.createWithdrawalOrder(request, response);
    expect(checkingAccountService.createWithdrawalOrder.calledOnce).to.be.true;
    expect(checkingAccountService.createWithdrawalOrder.calledWith(request.body)).to.be.true;
  });
  
  it('should return status code OK and an empty response', async function () {
    await checkingAccountController.createWithdrawalOrder(request, response);
    expect(response.status).calledWith(StatusCodes.OK);
    expect(response.json).calledWith();
  });
});
