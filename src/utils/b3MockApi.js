const { StatusCodes } = require('http-status-codes');
const errMsgs = require('./errorMessages.json');

const maxQuantityAllowed = 100;

const b3MockApi = (payload) => {
  if (payload.qtdeAtivo > maxQuantityAllowed) {
    const err = new Error(errMsgs.quantityTooHigh);
    err.status = StatusCodes.INTERNAL_SERVER_ERROR;
    return err;
  }
  return { status: StatusCodes.OK };
};

module.exports = b3MockApi;