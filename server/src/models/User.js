const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: [true, 'Please provide your full name'],
      trim: true,
      minlength: [2, 'Full name must be at least 2 characters'],
      maxlength: [50, 'Full name must be no more than 50 characters'],
    },
      affiliation: {
      type: String,
      required: [true, 'Please provide your affiliation (institution/organization)'],
      trim: true,
      maxlength: [150, 'Affiliation must be no more than 150 characters'],
    },
     designation: {
      type: String,
      required: [true, 'Please provide your position/designation'],
      trim: true,
      maxlength: [100, 'Designation must be no more than 100 characters'],
    },
    abstractID: {
      type: String,
      required: [true, 'Please provide the Abstract ID or Serial (from CMT)'],
      trim: true,
      unique: true,
    },
    abstractTitle: {
      type: String,
      required: [true, 'Please provide the Abstract Title'],
      trim: true,
      maxlength: [300, 'Abstract title must be no more than 300 characters'],
    },
    participationCategory: {
      type: String,
      enum: ['Oral', 'Poster', 'Only Attendee'],
      required: [true, 'Please select a participation category'],
    },
    presenterName: {
      type: String,
      required: [true, 'Please provide the presenter’s name'],
      trim: true,
      maxlength: [100, 'Presenter name must be no more than 100 characters'],
    },
    transactionDetails: {
      transactionID: {
        type: String,
        required: [true, 'Please provide the transaction ID'],
        trim: true,
      },
      dateTime: {
        type: String,
        required: [true, 'Please provide the transaction date/time'],
        trim: true,
      },
      senderBank: {
        type: String,
        trim: true,
      },
      foreignRemittance: {
        type: String,
        trim: true,
      },
    },
    phone:{
        type: String,
        required: [true, 'Please provide your phone number'],
        trim: true,
        maxlength: [14, 'Phone number must be no more than 14 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [8, 'Password must be at least 8 characters'],
      select: false,
    },
    profilePic: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      enum: ['user'],
      default: 'user',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    payment_status: {
      type: Boolean,
      default: false,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: String,
    emailVerificationExpires: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    passwordChangedAt: Date,
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Update passwordChangedAt property
userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// Compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Check if password changed after token was issued
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

// Create password reset token
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

  return resetToken;
};

// Create email verification token
userSchema.methods.createEmailVerificationToken = function () {
  const verificationToken = crypto.randomBytes(32).toString('hex');

  this.emailVerificationToken = crypto
    .createHash('sha256')
    .update(verificationToken)
    .digest('hex');

  this.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

  return verificationToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;