const SERVER_ERROR = require('./statusCodes').SERVER_ERROR;

class ServerError extends Error {
  constructor(status = SERVER_ERROR, message = 'Something went wrong', type = 'Server Error!', baseError = null) {
    super(message);
    this.status = status;
    this.type = type;
    this.baseError = baseError;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ServerError);
    }
  }

  getResponse() {
    return {
      type: this.type,
      message: this.message,
      stack: this.stack,
      originError: this.baseError,
    };
  }
}

module.exports = ServerError;
