const TodoService = require('../services/TodoService');
const statusCodes = require('../utils/statusCodes');

async function getAll(req, res, next) {
  try {
    const data = await TodoService.getAll();

    return res.status(statusCodes.SUCCESS).json({ data });
  } catch (e) {
    return next(e);
  }
}

async function create(req, res, next) {
  const { text, isDone } = req.body;

  try {
    const data = await TodoService.create(text, isDone);
    res.status(statusCodes.CREATED).json({ data });
  } catch (e) {
    next(e);
  }
}

async function remove(req, res, next) {
  const _id = req.params._id;

  try {
    await TodoService.remove(_id);
    return res.status(204).send();
  } catch (e) {
    next(e);
  }
}

async function toggle(req, res, next) {
  const _id = req.params._id;

  try {
    const data = await TodoService.toggle(_id);

    res.status(statusCodes.SUCCESS).json({ data });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAll,
  create,
  remove,
  toggle,
};
