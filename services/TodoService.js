const TodoModel = require('../models/Todo');
const ServerError = require('../utils/ServerError');
const statusCodes = require('../utils/statusCodes');

async function create(text, isDone = false) {
  let count = null;

  try {
    count = await TodoModel.count();

  } catch (e) {
    throw new ServerError(statusCodes.SERVER_ERROR, 'Can\'t save todo item!', 'Server Error!', e);
  }

  if (count > 30) {
    throw new ServerError(statusCodes.BAD_REQUEST, 'Can\'t save todo item!', 'Server Error!');
  }

  const todo = new TodoModel({ text, isDone });

  try {
    await todo.save();
    return todo;
  } catch (e) {
    throw new ServerError(statusCodes.SERVER_ERROR, 'Can\'t save todo item!', 'Server Error!', e);
  }
}

async function toggle(_id) {
  let todo = null;

  try {
    todo = await TodoModel.findOne({ _id });
    console.log('..........', todo);
  } catch (error) {
    throw new ServerError(statusCodes.SERVER_ERROR, 'Can\'t get todo item!', 'Server Error!', error);
  }

  if (!todo) {
    throw new ServerError(statusCodes.NOT_FOUND, 'Todo item not found!', 'Not found!');
  }

  todo.isDone = !todo.isDone;

  try {
    await todo.save();
    return todo;
  } catch (error) {
    throw new ServerError(statusCodes.SERVER_ERROR, 'Can\'t save todo item!', 'Server Error!', error);
  }
}

async function remove(_id) {
  let todo = null;

  try {
    todo = await TodoModel.findOne({ _id });
    console.log('..........', todo);
  } catch (error) {
    throw new ServerError(statusCodes.SERVER_ERROR, 'Can\'t get todo item!', 'Server Error!', error);
  }

  if (!todo) {
    throw new ServerError(statusCodes.NOT_FOUND, 'Todo item is not found!', 'Not Found!');
  }

  try {
    await todo.remove();
  } catch (e) {
    throw new ServerError(statusCodes.SERVER_ERROR, 'Can\'t remove todo item!', 'Server Error!', e);
  }
}

async function getAll() {
  try {
    return await TodoModel.find();
  } catch (e) {
    throw new ServerError(statusCodes.SERVER_ERROR, 'Can\'t get todo list!', 'Server Error!', e);
  }
}

module.exports = {
  create,
  toggle,
  remove,
  getAll,
};
