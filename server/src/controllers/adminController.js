const Admin = require('../models/Admin');
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

// Get admin profile
exports.getProfile = catchAsync(async (req, res, next) => {
  const admin = await Admin.findById(req.user.id);

  res.status(200).json({
    status: 'success',
    data: {
      admin,
    },
  });
});

// Update admin profile
exports.updateProfile = catchAsync(async (req, res, next) => {
  const { fullName } = req.body;

  const updatedAdmin = await Admin.findByIdAndUpdate(
    req.user.id,
    { fullName },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: 'success',
    data: {
      admin: updatedAdmin,
    },
  });
});

// Get all users with filtering, pagination, and search
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const { 
    page = 1, 
    limit = 10, 
    search = '', 
    paymentStatus = 'all' // 'all', 'paid', 'unpaid'
  } = req.query;

  // Build query
  const query = {};

  // Search filter
  if (search) {
    query.$or = [
      { Name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { abstractID: { $regex: search, $options: 'i' } },
    ];
  }

  // Payment status filter
  if (paymentStatus === 'paid') {
    query.payment_status = true;
  } else if (paymentStatus === 'unpaid') {
    query.payment_status = false;
  }

  // Calculate pagination
  const skip = (Number(page) - 1) * Number(limit);

  // Execute query with pagination
  const users = await User.find(query)
    .select('-password')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit));

  // Get total count for pagination
  const totalUsers = await User.countDocuments(query);
  const totalPaidUsers = await User.countDocuments({ payment_status: true });
  const totalUnpaidUsers = await User.countDocuments({ payment_status: false });

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(totalUsers / Number(limit)),
        totalUsers,
        limit: Number(limit),
      },
      stats: {
        totalPaidUsers,
        totalUnpaidUsers,
        totalUsers: totalPaidUsers + totalUnpaidUsers,
      },
    },
  });
});

// Get all users for export (no pagination)
exports.exportUsers = catchAsync(async (req, res, next) => {
  const { 
    search = '', 
    paymentStatus = 'all'
  } = req.query;

  // Build query
  const query = {};

  // Search filter
  if (search) {
    query.$or = [
      { Name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { abstractID: { $regex: search, $options: 'i' } },
    ];
  }

  // Payment status filter
  if (paymentStatus === 'paid') {
    query.payment_status = true;
  } else if (paymentStatus === 'unpaid') {
    query.payment_status = false;
  }

  // Execute query without pagination using lean() for better performance
  const users = await User.find(query)
    .select('-password -emailVerificationToken -passwordResetToken -passwordResetExpires -emailVerificationExpires')
    .sort({ createdAt: -1 })
    .lean(); // Convert to plain JavaScript objects for faster processing

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

// Get single user
exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

// Deactivate user
exports.deactivateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { isActive: false },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

// Activate user
exports.activateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { isActive: true },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});