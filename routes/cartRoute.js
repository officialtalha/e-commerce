const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cartController = require('../controllers/cartController');
const authenticate = require('../middlewares/auth');
router.use(bodyParser.json());
router.get('/:userId', cartController.cartControllerGet);
router.delete('/:prodId', authenticate.authenticate, cartController.cartControllerDeleteProd);
router.delete('/', authenticate.authenticate, cartController.cartControllerDeleteFullCart);

module.exports = router;