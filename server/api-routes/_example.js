const { Router } = require('express');
const router = Router();
const exampleController = require('../controllers/_example');

router.get('/', exampleController.index);

module.exports = router;