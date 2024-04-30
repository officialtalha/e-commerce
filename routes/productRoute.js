const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const productController = require('../controllers/productController');
router.use(bodyParser.json());
router.post('/', productController.productControllerPost);
router.get('/', productController.productControllerGet);

module.exports = router;