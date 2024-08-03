import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

// Define the schema for the User model
const userSchema = new Schema<IUser, UserModel>(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    wallet: {
      type: Number,
      required: true,
      default: 150,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
  },
  { timestamps: true }, // Adds createdAt and updatedAt timestamps
);

// Middleware: Pre-save hook to hash the password before saving
userSchema.pre('save', async function (next) {
  // Hash the password using bcrypt before saving
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcryptSaltRounds),
  );
  next();
});

// Method to remove sensitive fields before returning user object as JSON
userSchema.methods.toJSON = function () {
  const userObject = this.toObject();

  // Remove password and role fields from the user object
  delete userObject?.password;
  delete userObject?.role;
  delete userObject?.isBlocked;

  return userObject;
};

// Static method to check if a user with the given email exists
userSchema.statics.isUserExistsByEmail = async function (email: string) {
  // Find a user with the given email
  const existingUser = await User.findOne({ email }).select('+password');
  return existingUser;
};

// Create the User model using the schema
export const User = model<IUser, UserModel>('User', userSchema);
