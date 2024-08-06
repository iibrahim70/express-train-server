import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';
import { Wallet } from './wallet.model';
import { JwtPayload } from 'jsonwebtoken';
import { User } from '../User/user.model';

const getWalletByUserIdFromDB = async (user: JwtPayload) => {
  // Find the user by email
  const existingUser = await User.isUserExistsByEmail(user.email);

  if (!existingUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found for this email!');
  }

  // Find wallet by userId
  const wallet = await Wallet.findOne({ userId: existingUser._id });

  if (!wallet) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Wallet not found for this user!');
  }

  return wallet;
};

const addFundsToWalletFromDB = async (user: JwtPayload, payload: number) => {
  // Find the user by email
  const existingUser = await User.isUserExistsByEmail(user.email);

  if (!existingUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found for this email!');
  }

  // Find wallet by userId
  const wallet = await Wallet.findOne({ userId: existingUser._id });

  if (!wallet) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Wallet not found for this user!');
  }

  wallet.balance += payload;
  wallet.transactions.push({
    amount: payload,
    date: new Date(),
    type: 'credit',
  });
  await wallet.save();
  return wallet;
};

export const WalletServices = {
  getWalletByUserIdFromDB,
  addFundsToWalletFromDB,
};
