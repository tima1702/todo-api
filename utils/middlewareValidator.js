const ServerError = require('./ServerError');
const statusCodes = require('./statusCodes');

function getMessageFromDetails(details) {
  return details.map(({ message }) => message).join(', ')
}
function query(schema) {
  return function validateQuery(req, res, next) {
    const { error } = schema.validate(req.query);

    if (error) {
      const { name, details } = error;

      return next(new ServerError(statusCodes.BAD_REQUEST, getMessageFromDetails(details), name, error));
    }

    next();
  };
}

function body(schema) {
  return function validateBody(req, res, next) {
    const { error } = schema.validate(req.body);

    if (error) {
      const { name, details } = error;

      return next(new ServerError(statusCodes.BAD_REQUEST, getMessageFromDetails(details), name, error));
    }

    next();
  };
}

function params(schema) {
  return function validateParams(req, res, next) {
    const { error } = schema.validate(req.params);

    if (error) {
      const { name, details } = error;

      return next(new ServerError(statusCodes.BAD_REQUEST, getMessageFromDetails(details), name, error));
    }

    next();
  };
}

module.exports = {
  query,
  body,
  params,
};
