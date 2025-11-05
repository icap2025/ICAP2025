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
  const { 
    Name, 
    affiliation, 
    designation, 
    phone, 
    abstractTitle,
    participationCategory,
    presenterName
  } = req.body;

  const updateData = {};
  if (Name) updateData.Name = Name;
  if (affiliation) updateData.affiliation = affiliation;
  if (designation) updateData.designation = designation;
  if (phone) updateData.phone = phone;
  if (abstractTitle) updateData.abstractTitle = abstractTitle;
  if (participationCategory) updateData.participationCategory = participationCategory;
  if (presenterName) updateData.presenterName = presenterName;

  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    updateData,
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