import httpStatus from 'http-status';
import { IUser } from './user.interface';
import ApiError from '../../errors/ApiError';
import { User } from './user.model';
import bcrypt from 'bcrypt';
import config from '../../config';
import { createToken } from '../../helpers/auth';

const registerUserFromDB = async (payload: IUser) => {
  // Check if a user with the provided email already exists
  if (await User.isUserExistsByEmail(payload?.email)) {
    // If user already exists, throw a CONFLICT ApiError
    throw new ApiError(httpStatus.CONFLICT, 'User already exists!');
  }

  // Create userPayload with default values for certain fields
  const userPayload: IUser = {
    ...payload,
    role: 'user', // Set default role
    status: 'in-progress', // Set default status
    isBlocked: false, // Set default blocked status
    isDeleted: false, // Set default deleted status
  };

  // If user does not exist, create the new user
  const result = User.create(userPayload);
  return result;
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
