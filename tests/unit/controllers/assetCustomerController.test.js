const chai = require('chai')
const sinon = require('sinon')
chai.use(require('sinon-chai'))
const { expect } = require('chai')
const assetCustomerService = require('../../../src/services/assetCustomer.service')
const { StatusCodes } = require('http-status-codes')
const { errMsgs } = require('../../../src/utils/errorMessages')
const assetCustomerController = require('../../../src/controllers/assetCustomer.controller')
const { response } = require('express')

describe('assetCustomerController buyOrder method tests', () => { 
  let assetServiceStub
  let request
  let response
  beforeEach(() => {
    request = {}
    response = {}
    response.body = {}
    response.status = sinon.stub().returns(response)
    response.json = sinon.stub().returns(response)
    assetServiceStub = sinon.stub(assetCustomerService, 'buyOrder').resolves()
  })
  afterEach(() => {
    sinon.restore()
  })
  it('should call assetCustomerService buyOrder method once', async () => {
    await assetCustomerController.buyOrder(request, response)
    expect(assetServiceStub.calledOnce).to.be.true
    expect(assetServiceStub.calledWith(request.body)).to.be.true
    expect(response.status.calledWith(StatusCodes.OK)).to.be.true
    expect(response.json.calledOnce).to.be.true
  })
})

describe('assetCustomerController sellOrder method tests', () => { 
  let assetServiceStub
  let request
  let response
  beforeEach(() => {
    request = {}
    response = {}
    response.body = {}
    response.status = sinon.stub().returns(response)
    response.json = sinon.stub().returns(response)
    assetServiceStub = sinon.stub(assetCustomerService, 'sellOrder').resolves()
  })
  afterEach(() => {
    sinon.restore()
  })
  it('should call assetCustomerService sellOrder method once', async () => {
    await assetCustomerController.sellOrder(request, response)
    expect(assetServiceStub.calledOnce).to.be.true
    expect(assetServiceStub.calledWith(request.body)).to.be.true
    expect(response.status.calledWith(StatusCodes.OK)).to.be.true
    expect(response.json.calledOnce).to.be.true
  })
})