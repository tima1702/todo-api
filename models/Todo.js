const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    min: 3,
    max: 25,
  },
  isDone: {
    type: Boolean,
    default: false,
  },
});

const TodoModel = mongoose.model('todos', todoSchema);

module.exports = TodoModel;
