const mongoose = require('mongoose');

module.exports = function validateObjectId(value, helpers) {
  if (!mongoose.isValidObjectId(value)) {
    helpers.error('Invalid ObjectId')
  }
};
