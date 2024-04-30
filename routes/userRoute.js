const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const userController = require('../controllers/userController');
const authenticate = require('../middlewares/auth');
router.use(bodyParser.json());
router.get('/', authenticate.authenticate, userController.userControllerGet);
module.exports = router;