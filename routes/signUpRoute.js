const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const signUpController = require('../controllers/signUpController');
router.use(bodyParser.json());
router.post('/', signUpController.signUpControllerPOst);

module.exports = router;