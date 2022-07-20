const raiseError = (errorStatus, errorMessage) => {
  const err = new Error(errorMessage);
    err.status = errorStatus;
    throw err;
};

module.exports = raiseError;