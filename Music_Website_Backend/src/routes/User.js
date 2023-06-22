const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/UserController');
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.post('/user-infor', userController.findUser);
router.post('/current-user', userController.findUserByToken);
router.post('/login', userController.login);
router.post('/register', userController.register);

module.exports = router;
