import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';
import { Wallet } from './wallet.model';

const addFundsToWallet = async (userId: string, amount: number) => {
  const wallet = await Wallet.findOne({ userId });
  if (!wallet) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Wallet not found for this user!');
  }

  wallet.balance += amount;
  wallet.transactions.push({ amount, date: new Date(), type: 'credit' });
  await wallet.save();
  return wallet;
};

const getWalletByUserId = async (userId: string) => {
  const wallet = await Wallet.findOne({ userId });
  if (!wallet) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Wallet not found for this user!');
  }
  return wallet;
};

export const WalletServices = {
  addFundsToWallet,
  getWalletByUserId,
};
