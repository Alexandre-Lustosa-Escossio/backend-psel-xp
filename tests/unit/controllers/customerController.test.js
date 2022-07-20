const chai = require('chai')
const sinon = require('sinon')
chai.use(require('sinon-chai'))
const { expect } = require('chai')
const { customerService } = require('../../../src/services')
const { StatusCodes } = require('http-status-codes')
const { customerController } = require('../../../src/controllers')


describe.only('getCustomerAssets tests', () => {
  const mockServiceReturn = {
    id: 1,
    assets: [{
      asset_code: 'xpbr31',
      Asset_Customers: {
        quantity: 1,
        price: 100
      }
    }]
  }
  
  const mockControllerReturn = {
    CodCliente: 1,
    CodAtivo: 'xpbr31',
    QtdeAtivo: 1,
    Valor: 100
  }
  const response = {}
  const request = {}
  
  beforeEach(() => {
    sinon.stub(customerService, 'getCustomerAssets').returns(mockServiceReturn)
    request.params = { id: 1 }
    response.status = sinon.stub().returns(response)
    response.json = sinon.stub().returns(response)
  });

  afterEach(() => {
    sinon.restore()
  });

  it('should call customerService getCustomerAssets method and return an ok response', async () => {
    await customerController.getCustomerAssets(request, response)
    expect(customerService.getCustomerAssets).calledOnce
    expect(response.status.calledOnce).to.be.true
    expect(response.status).calledWith(StatusCodes.OK)
    expect(response.json.calledOnce).to.be.true
  });
})
