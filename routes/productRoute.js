const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const productController = require('../controllers/productController');
const authenticate = require('../middlewares/auth');
router.use(bodyParser.json());
router.post('/', productController.productControllerPost);
router.post('/:prodId', productController.productControllerPostCart);
router.get('/:prodId', authenticate.authenticate, productController.productControllerGetProdDetail);
router.get('/', productController.productControllerGet);

module.exports = router;