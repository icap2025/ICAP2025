const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const uploadService = require('../services/uploadService');

// Get user profile
exports.getProfile = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

// Update user profile
exports.updateProfile = catchAsync(async (req, res, next) => {
  const { fullName, companyName } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    { fullName, companyName },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

// Update user profile picture
exports.updateProfilePicture = catchAsync(async (req, res, next) => {
  if (!req.body.image) {
    return next(new AppError('Please provide an image', 400));
  }

  // Upload to Cloudinary
  const result = await uploadService.uploadImage(req.body.image, 'user-profiles');

  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    { profilePic: result.secure_url },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

// Change password
exports.changePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;

  // Get user with password
  const user = await User.findById(req.user.id).select('+password');

  // Check if current password is correct
  if (!(await user.comparePassword(currentPassword))) {
    return next(new AppError('Your current password is wrong.', 401));
  }

  // Update password
  user.password = newPassword;
  await user.save();

  res.status(200).json({
    status: 'success',
    message: 'Password changed successfully!',
  });
});