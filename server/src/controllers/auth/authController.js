const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../../models/User');
const Admin = require('../../models/Admin');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/AppError');
const emailService = require('../../services/emailService');

// Generate JWT token
const signToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: '7d',
  });
};

// Create and send token
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  // Cookie options
  const cookieOptions = {
    expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  };

  res.cookie('jwt', token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
    message: 'Authentication successful !',
  });
};

// User Registration
exports.userRegister = catchAsync(async (req, res, next) => {
    const { 
        Name, 
        affiliation, 
        designation, 
        abstractID, 
        abstractTitle, 
        participationCategory,
        registrationCategory,
        presenterName,
        phone, 
        email, 
        password,
        CoAuthorNames,
        profilePic
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
        // Case 1: Email is already verified
        if (existingUser.isEmailVerified) {
            return next(new AppError('Email already registered and verified', 400));
        }
        
        // Case 2: Email verification token not expired yet
        if (existingUser.emailVerificationExpires && existingUser.emailVerificationExpires > Date.now()) {
            return next(
                new AppError(
                    'Email already registered. Please verify your email. Check your inbox or spam folder.',
                    400
                )
            );
        }
        
        // Case 3: Email not verified and token expired - delete and allow re-registration
        if (!existingUser.isEmailVerified && 
                (!existingUser.emailVerificationExpires || existingUser.emailVerificationExpires <= Date.now())) {
            await User.findByIdAndDelete(existingUser._id);
        }
    }

    // // Check if abstractID already exists
    // const existingAbstractID = await User.findOne({ abstractID });
    // if (existingAbstractID) {
    //     return next(new AppError('Abstract ID already registered', 400));
    // }

    // Create new user
    const newUser = await User.create({
        Name,
        affiliation,
        designation,
        abstractID,
        abstractTitle,
        participationCategory,
        registrationCategory,
        presenterName,
        CoAuthorNames,
        phone,
        email,
        password,
        profilePic,
    });

    // Create email verification token
    const verificationToken = newUser.createEmailVerificationToken();
    await newUser.save({ validateBeforeSave: false });

    // Send verification email
    try {
        const verificationURL = `${process.env.NEXT_PUBLIC_APP_FRONTEND_URL}/verify-email?token=${verificationToken}`;
        
        await emailService.sendVerificationEmail(
            newUser.email,
            newUser.Name,
            verificationURL
        );

        createSendToken(newUser, 201, res);
    } catch (err) {
        newUser.emailVerificationToken = undefined;
        newUser.emailVerificationExpires = undefined;
        await newUser.save({ validateBeforeSave: false });

        return next(
            new AppError('There was an error sending the email. Try again later!', 500)
        );
    }
});

// Admin Login
exports.adminLogin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }

  // Check if admin exists && password is correct
  const admin = await Admin.findOne({ email }).select('+password');

  if (!admin || !(await admin.comparePassword(password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // Check if admin is active
  if (!admin.isActive) {
    return next(new AppError('Your account has been deactivated', 401));
  }

  createSendToken(admin, 200, res);
});

// User Login
exports.userLogin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }

  // Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.comparePassword(password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // Check if email is verified
  if (!user.isEmailVerified) {
    return next(new AppError('Please verify your email before logging in. Check your inbox and spam folder.', 401));
  }

  // Check if user is active
  if (!user.isActive) {
    return next(new AppError('Your account has been deactivated', 401));
  }

  createSendToken(user, 200, res);
});

// Logout
exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};

// Forgot Password
exports.forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const { userType } = req.query; // 'admin' or 'user'

  // Get user based on email
  const Model = userType === 'admin' ? Admin : User;
  const user = await Model.findOne({ email });

  if (!user) {
    return next(new AppError('There is no user with that email address.', 404));
  }

  // Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // Send it to user's email
  try {
    const resetURL =
      userType === 'admin'
        ? `${process.env.NEXT_PUBLIC_ADMIN_FRONTEND_URL}/reset_password?token=${resetToken}`
        : `${process.env.NEXT_PUBLIC_APP_FRONTEND_URL}/reset_password?token=${resetToken}`;

    await emailService.sendPasswordResetEmail(
      user.email,
      user.Name || user.fullName,
      resetURL
    );

    res.status(200).json({
      status: 'success',
      message: 'Password reset link sent to email!',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError('There was an error sending the email. Try again later!', 500)
    );
  }
});

// Reset Password
exports.resetPassword = catchAsync(async (req, res, next) => {
  const { token } = req.params;
  const { newPassword } = req.body;
  const { userType } = req.query; // 'admin' or 'user'

  if (!token) {
    return next(new AppError('Reset token is required', 400));
  }

  if (!newPassword) {
    return next(new AppError('New password is required', 400));
  }

  // Get user based on the token
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  const Model = userType === 'admin' ? Admin : User;
  const user = await Model.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }

  user.password = newPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  res.status(200).json({
    status: 'success',
    message: 'Password has been reset successfully! You can now log in with your new password.',
  });
});

// Verify Email
exports.verifyEmail = catchAsync(async (req, res, next) => {
  const { token } = req.params;

  if (!token) {
    return next(new AppError('Verification token is required', 400));
  }

  // Get user based on the token
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  const user = await User.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }

  user.isEmailVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpires = undefined;
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: 'success',
    message: 'Email verified successfully! You can now log in.',
  });
});