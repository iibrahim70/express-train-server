import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';
import { ITrain } from './train.interface';
import { Train } from './train.model';
import { Station } from '../Station/station.model';
import { User } from '../User/user.model';
import { JwtPayload } from 'jsonwebtoken';

const createTrainFromDB = async (user: JwtPayload, payload: ITrain) => {
  // Find the user by email
  const existingUser = await User.isUserExistsByEmail(user.email);

  if (!existingUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found for this email!');
  }

  // Check if a train with the provided trainCode already exists
  if (await Train.isTrainExistsByTrainCode(payload.trainCode)) {
    // If train already exists, throw a CONFLICT ApiError
    throw new ApiError(httpStatus.CONFLICT, 'Train already exists!');
  }

  // Validate if all station codes in the train's schedule exist
  for (const stop of payload.stops) {
    if (!(await Station.isStationExistsByStationCode(stop.stationCode))) {
      // If any station does not exist, throw a NOT_FOUND ApiError
      throw new ApiError(
        httpStatus.NOT_FOUND,
        `Station with code ${stop.stationCode} does not exist!`,
      );
    }
  }

  // Check for duplicate station codes in the schedule
  const stationCodes = payload.stops.map((stop) => stop.stationCode);
  const uniqueStationCodes = new Set(stationCodes);
  if (stationCodes.length !== uniqueStationCodes.size) {
    // If there are duplicates, throw a BAD_REQUEST ApiError
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Duplicate station found in the stops!',
    );
  }

  // Add the userId to the payload
  const trainPayload = {
    ...payload,
    createdBy: existingUser._id, // Add the userId to the payload
  };

  // If train does not exist and all station codes are valid, create the new train
  const result = await Train.create(trainPayload);
  return result;
};

const getAllTrainsFromDB = async () => {
  const result = await Train.find();
  return result;
};

const getSingleTrainFromDB = async (trainId: string) => {
  const result = await Train.findById(trainId);

  // If no train is found with the provided ID, throw a NOT_FOUND ApiError
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Train not found with this ID!');
  }

  return result;
};

const updateTrainFromDB = async (trainId: string, payload: ITrain) => {
  // Check for duplicate station codes in the schedule
  const stationCodes = payload.stops.map((stop) => stop.stationCode);
  const uniqueStationCodes = new Set(stationCodes);
  if (stationCodes.length !== uniqueStationCodes.size) {
    // If there are duplicates, throw a BAD_REQUEST ApiError
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Duplicate station codes found in the schedule!',
    );
  }

  // Validate if all station codes in the train's schedule exist
  for (const stop of payload.stops) {
    if (!(await Station.isStationExistsByStationCode(stop.stationCode))) {
      // If any station does not exist, throw a NOT_FOUND ApiError
      throw new ApiError(
        httpStatus.NOT_FOUND,
        `Station with code ${stop.stationCode} does not exist!`,
      );
    }
  }

  // Update the train with the provided payload
  const result = await Train.findByIdAndUpdate(trainId, payload, {
    new: true,
  });

  // If no train is found with the provided ID, throw a NOT_FOUND ApiError
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Train not found with this ID!');
  }

  return result;
};

export const TrainServices = {
  createTrainFromDB,
  getAllTrainsFromDB,
  getSingleTrainFromDB,
  updateTrainFromDB,
};
