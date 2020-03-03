const ServerError = require('./ServerError');
const statusCodes = require('./statusCodes');

function clientHttpError(err, req, res, next) {
  if (err instanceof ServerError) {
    return res
      .status(err.status)
      .json({
        error: err.getResponse(),
      });
  }

  return res.status(statusCodes.SERVER_ERROR).json({
    error: {
      message: 'Something went wrong!',
      type: 'Server Error',
      originError: err,
    },
  });
}

module.exports = clientHttpError;
