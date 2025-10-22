const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/auth/authController');
const { protect, restrictTo } = require('../middlewares/auth');
const validators = require('../middlewares/validators');

const router = express.Router();

// User registration
router.post(
  '/register',
  validators.userRegisterValidation,
  validators.validate,
  authController.userRegister
);

// User login
router.post(
  '/login',
  validators.loginValidation,
  validators.validate,
  authController.userLogin
);

// User forgot password
router.post(
  '/forgot-password',
  validators.forgotPasswordValidation,
  validators.validate,
  (req, res, next) => {
    req.query.userType = 'user';
    next();
  },
  authController.forgotPassword
);

// User reset password
router.post(
  '/reset-password',
  validators.resetPasswordValidation,
  validators.validate,
  (req, res, next) => {
    req.query.userType = 'user';
    next();
  },
  authController.resetPassword
);

// Protected routes (require authentication and user role)
router.use(protect);
router.use(restrictTo('user'));

// User profile
router.get('/profile', userController.getProfile);
router.patch('/profile', userController.updateProfile);
router.patch('/profile-picture', userController.updateProfilePicture);
router.patch('/change-password', userController.changePassword);

module.exports = router;