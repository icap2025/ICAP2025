const express = require('express');
const authController = require('../controllers/auth/authController');
const validators = require('../middlewares/validators');

const router = express.Router();

// User routes
router.post(
  '/register',
  validators.userRegisterValidation,
  validators.validate,
  authController.userRegister
);

router.post(
  '/login',
  validators.loginValidation,
  validators.validate,
  authController.userLogin
);

router.post('/verify-email', authController.verifyEmail);

// Logout
router.post('/logout', authController.logout);

module.exports = router;