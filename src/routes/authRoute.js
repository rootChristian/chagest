const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
//const loginLimiter = require('../middleware/loginLimiter')

router.post('/', /*loginLimiter, */authController.login);
router.post('/logout', authController.logout);
router.get('/refresh', authController.refresh);

module.exports = router