const router = require('express').Router();
const todoRoutes = require('./todo');

router.use('/todo', todoRoutes);

module.exports = router;
