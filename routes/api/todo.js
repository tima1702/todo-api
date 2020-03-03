const router = require('express').Router();
const Joi = require('@hapi/joi');

const TodoController = require('../../controllers/TodoController');
const middlewareValidator = require('../../utils/middlewareValidator');
const validateObjectId = require('../../utils/validateObjectId');

const createSchema = Joi.object({
  text: Joi.string().min(3).max(25).required(),
  isDone: Joi.bool(),
});

const paramsSchema = Joi.object({
  _id: Joi.string().custom(validateObjectId).required(),
});

router.get('/', TodoController.getAll);
router.post('/', middlewareValidator.body(createSchema), TodoController.create);
router.delete('/:_id', middlewareValidator.params(paramsSchema), TodoController.remove);
router.put('/:_id', middlewareValidator.params(paramsSchema), TodoController.toggle);

module.exports = router;
