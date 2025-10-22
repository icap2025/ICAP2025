const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const Admin = require('../models/Admin');
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

// Protect routes - verify JWT token
exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check if it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.SECRET_KEY);

  // 3) Check if user still exists
  let currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    currentUser = await Admin.findById(decoded.id);
  }

  if (!currentUser) {
    return next(
      new AppError('The user belonging to this token no longer exists.', 401)
    );
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401)
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});

// Restrict to specific roles
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }
    next();
  };
};

// Check if email is verified (for users only)
exports.requireEmailVerification = catchAsync(async (req, res, next) => {
  if (req.user.role === 'user' && !req.user.isEmailVerified) {
    return next(
      new AppError('Please verify your email address to access this resource.', 403)
    );
  }
  next();
});