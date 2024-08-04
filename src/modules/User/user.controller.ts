import httpStatus from 'http-status';
import catchAsync from '../../helpers/catchAsync';
import sendResponse from '../../helpers/sendResponse';
import { UserServices } from './user.service';

const registerUser = catchAsync(async (req, res) => {
  const result = await UserServices.registerUserFromDB(req.body);

  return sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Thanks for registering!',
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await UserServices.loginUserFromDB(req.body);

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login successful!',
    data: result,
  });
});

export const UserControllers = {
  registerUser,
  loginUser,
};
