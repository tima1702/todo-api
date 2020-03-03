const router = require('express').Router();
const apiRoutes = require('./api');
const docsRoutes = require('./docs');

router.get('/', (req, res) => {
  res.status(200).json({ data: { message: 'All Ok!' } });
});

router.use('/api', apiRoutes);
router.use('/docs', docsRoutes);

module.exports = router;
