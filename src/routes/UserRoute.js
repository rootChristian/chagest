/***********************************************************************
************ Author:    Christian KEMGANG NGUESSOP *********************
************ Version:    1.0.0                      ********************
***********************************************************************/
const router = require('express').Router();
const userController = require("../controllers/userController");
//const { verifyTokenAndAdmin, verifyTokenAndAuthorized } = require("../middleware/AuthMiddleware");

//Routes
//router.post('/', verifyTokenAndAdmin, userController.addUser);
router.get('/', userController.getAllUsers);
router.post('/', userController.createNewUser);
router.patch('/', userController.updateUser);
router.delete('/', userController.deleteUser);


module.exports = router;
