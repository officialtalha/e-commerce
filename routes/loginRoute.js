const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const loginController = require('../controllers/loginController');
router.use(bodyParser.json());
router.post('/', loginController.loginControllerPOst);

module.exports = router;