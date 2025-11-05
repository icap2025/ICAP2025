const { body, validationResult } = require('express-validator');
const AppError = require('../utils/AppError');

// Validation middleware
exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    return next(new AppError(errorMessages.join('. '), 400));
  }
  next();
};

// User registration validation
exports.userRegisterValidation = [
  body('Name')
    .trim()
    .notEmpty()
    .withMessage('Full name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Full name must be between 2 and 50 characters'),
  body('affiliation')
    .trim()
    .notEmpty()
    .withMessage('Affiliation (institution/organization) is required')
    .isLength({ max: 150 })
    .withMessage('Affiliation must be no more than 150 characters'),
  body('designation')
    .trim()
    .notEmpty()
    .withMessage('Designation/Position is required')
    .isLength({ max: 100 })
    .withMessage('Designation must be no more than 100 characters'),
  body('abstractID')
    .trim()
    .notEmpty()
    .withMessage('Abstract ID is required'),
  body('abstractTitle')
    .trim()
    .notEmpty()
    .withMessage('Abstract title is required')
    .isLength({ max: 300 })
    .withMessage('Abstract title must be no more than 300 characters'),
  body('participationCategory')
    .notEmpty()
    .withMessage('Participation category is required')
    .isIn(['Oral', 'Poster', 'Only Attendee', 'Online/Virtual'])
    .withMessage('Invalid participation category'),
  body('presenterName')
    .trim()
    .notEmpty()
    .withMessage('Presenter name is required')
    .isLength({ max: 100 })
    .withMessage('Presenter name must be no more than 100 characters'),
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .isLength({ max: 14 })
    .withMessage('Phone number must be no more than 14 characters'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),
  body('profilePic')
    .optional()
    .isString()
    .withMessage('Profile picture must be a string'),
];

// Login validation
exports.loginValidation = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
];

// Forgot password validation
exports.forgotPasswordValidation = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
];

// Reset password validation
exports.resetPasswordValidation = [
  body('token').notEmpty().withMessage('Token is required'),
  body('newPassword')
    .notEmpty()
    .withMessage('New password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),
  body('confirmNewPassword')
    .notEmpty()
    .withMessage('Please confirm your new password')
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),
];