const router = require('express').Router();

router.use('/vehicles', require('./vehicles'));
router.use('/dealerships', require('./dealership'));

module.exports = router;