const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cartController = require('../controllers/cartController');
router.use(bodyParser.json());
router.get('/:userId', cartController.cartControllerGet);

module.exports = router;