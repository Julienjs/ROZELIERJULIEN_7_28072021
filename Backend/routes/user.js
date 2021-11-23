const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth');
const usersCtrl = require('../controllers/user');


const { rules, rulesPassword, rulesChangePassword, validate } = require('../middleware/validator');
const multer = require('../middleware/multer-config');


router.post('/signup', rules(), validate, multer, authCtrl.signup);
router.post('/login', authCtrl.login);
router.get('/', usersCtrl.getAllUsers);
router.get('/:id', usersCtrl.IdUser);
router.delete('/:id', usersCtrl.deleteUser);
router.put('/:id', usersCtrl.modifyProfil);
router.put('/:id/image', multer, usersCtrl.updateImg);
router.put('/:id/changepassword', rulesChangePassword(), validate, usersCtrl.changePassword);
router.get('/:id/resetPassword', usersCtrl.resetPassword);
router.post('/forgotPassword', usersCtrl.forgotPassword);
router.put('/:id/changePasswordViaEmail', rulesPassword(), validate, usersCtrl.changePasswordViaEmail);








module.exports = router;