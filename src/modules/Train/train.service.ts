import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';
import { ITrain } from './train.interface';
import { Train } from './train.model';

const createTrainFromDB = async (payload: ITrain) => {
  // Check if a train with the provided trainCode already exists
  if (await Train.isTrainExistsByTrainCode(payload.trainCode)) {
    // If train already exists, throw a CONFLICT ApiError
    throw new ApiError(httpStatus.CONFLICT, 'Train already exists!');
  }

  // If train does not exist, create the new train
  const result = await Train.create(payload);
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
