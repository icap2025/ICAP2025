const express = require('express');
const adminController = require('../controllers/adminController');
const authController = require('../controllers/auth/authController');
const { protect, restrictTo } = require('../middlewares/auth');
const validators = require('../middlewares/validators');

const router = express.Router();

// Admin login
router.post(
  '/login',
  validators.loginValidation,
  validators.validate,
  authController.adminLogin
);

// Admin forgot password
router.post(
  '/forgot-password',
  validators.forgotPasswordValidation,
  validators.validate,
  (req, res, next) => {
    req.query.userType = 'admin';
    next();
  },
  authController.forgotPassword
);

// Admin reset password
router.post(
  '/reset-password',
  validators.resetPasswordValidation,
  validators.validate,
  (req, res, next) => {
    req.query.userType = 'admin';
    next();
  },
  authController.resetPassword
);

// Protected routes (require authentication and admin role)
router.use(protect);
router.use(restrictTo('admin'));

// Admin profile
router.get('/profile', adminController.getProfile);
router.patch('/profile', adminController.updateProfile);

// User management
router.get('/users/export', adminController.exportUsers); // Must be before /:id route
router.get('/users', adminController.getAllUsers);
router.get('/users/:id', adminController.getUser);
router.patch('/users/:id/deactivate', adminController.deactivateUser);
router.patch('/users/:id/activate', adminController.activateUser);

module.exports = router;