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

// Email verification - GET request with token in URL
router.get('/verify-email/:token', authController.verifyEmail);

// Password reset routes
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:token', authController.resetPassword);

// Logout
router.post('/logout', authController.logout);

module.exports = router;