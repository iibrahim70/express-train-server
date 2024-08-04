import httpStatus from 'http-status';
import catchAsync from '../../helpers/catchAsync';
import sendResponse from '../../helpers/sendResponse';
import { WalletServices } from './wallet.service';

const getWallet = catchAsync(async (req, res) => {
  const result = await WalletServices.getWalletByUserId(req?.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Wallet retrieved successfully!',
    data: result,
  });
});

const addFunds = catchAsync(async (req, res) => {
  const result = await WalletServices.addFundsToWallet(
    req?.user,
    req?.body?.amount,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Funds added successfully!',
    data: result,
  });
});

export const WalletControllers = {
  getWallet,
  addFunds,
};
