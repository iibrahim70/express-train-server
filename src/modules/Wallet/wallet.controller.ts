import httpStatus from 'http-status';
import catchAsync from '../../helpers/catchAsync';
import sendResponse from '../../helpers/sendResponse';
import { WalletServices } from './wallet.service';

const addFunds = catchAsync(async (req, res) => {
  const { userId, amount } = req.body;
  const result = await WalletServices.addFundsToWallet(userId, amount);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Funds added successfully!',
    data: result,
  });
});

const getWallet = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await WalletServices.getWalletByUserId(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Wallet retrieved successfully!',
    data: result,
  });
});

export const WalletControllers = {
  addFunds,
  getWallet,
};
