import httpStatus from 'http-status';
import { IUser } from './user.interface';
import ApiError from '../../errors/ApiError';
import { User } from './user.model';
import bcrypt from 'bcrypt';
import config from '../../config';
import { Wallet } from '../Wallet/wallet.model';
import createToken from '../../helpers/createToken';
import mongoose from 'mongoose';

const registerUserFromDB = async (payload: IUser) => {
  const session = await mongoose.startSession();

  // Check if a user with the provided email already exists
  if (await User.isUserExistsByEmail(payload?.email)) {
    // If user already exists, throw a CONFLICT ApiError
    throw new ApiError(httpStatus.CONFLICT, 'User already exists!');
  }

  try {
    session.startTransaction();

    // Create userPayload with default values for certain fields
    const userPayload: IUser = {
      ...payload,
      role: 'user', // Set default role
      status: 'in-progress', // Set default status
      isBlocked: false, // Set default blocked status
      isDeleted: false, // Set default deleted status
    };

    // Create the new user
    const newUser = await User.create([userPayload], { session });

    // Create wallet for the newly registered user
    const walletPayload = {
      userId: newUser[0]._id, // Reference to the new user's ID
      balance: 50, // Initialize balance to 50
      transactions: [
        {
          amount: 50,
          date: new Date(),
          type: 'credit',
          ref: 'New Account Bonus!',
        },
      ], // Initialize with the first transaction
    };

    const newWallet = await Wallet.create([walletPayload], { session });

    // Commit the transaction
    await session.commitTransaction();
    await session.endSession();

    return {
      user: newUser,
      wallet: newWallet,
    };
  } catch (error) {
    // Abort the transaction in case of an error
    await session.abortTransaction();
    await session.endSession();

    // Re-throw the error to be handled by the caller
    throw error;
  }
};

const loginUserFromDB = async (payload: Partial<IUser>) => {
  // Check if a user with the provided email exists
  const existingUser = await User.isUserExistsByEmail(payload?.email as string);

  if (!existingUser) {
    // If user does not exist, throw a NOT_FOUND ApiError
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'User with this email does not exist.',
    );
  }

  // Compare hashed password to provided password
  const isPasswordValid = await bcrypt.compare(
    payload?.password as string,
    existingUser?.password,
  );

  if (!isPasswordValid) {
    // If password is invalid, throw a FORBIDDEN ApiError
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Password');
  }

  // Create JWT payload for token generation
  const jwtPayload = {
    email: existingUser?.email,
    role: existingUser?.role,
  };

  // Generate access token for the user
  const accessToken = createToken(
    jwtPayload,
    config.jwtAccessSecret as string,
    config.jwtAccessExpiresIn as string,
  );

  return {
    accessToken,
  };
};

export const UserServices = {
  registerUserFromDB,
  loginUserFromDB,
};