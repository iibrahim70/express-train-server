import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';
import { IStation } from './station.interface';
import { Station } from './station.model';

const createStationFromDB = async (payload: IStation) => {
  // Check if a user with the provided email already exists
  if (await Station.isStationExistsByStationCode(payload?.stationCode)) {
    // If user already exists, throw a CONFLICT ApiError
    throw new ApiError(httpStatus.CONFLICT, 'Station already exists!');
  }

  // If user does not exist, create the new station
  const result = await Station.create(payload);
  return result;
};

const getAllStationsFromDB = async () => {
  const result = await Station.find();
  return result;
};

const getSingleStationFromDB = async (stationId: string) => {
  const result = await Station.findById(stationId);
  return result;
};

const updateStationFromDB = async (stationId: string, payload: IStation) => {
  const result = await Station.findByIdAndUpdate(stationId, payload, {
    new: true,
  });
  return result;
};

export const StationServices = {
  createStationFromDB,
  getAllStationsFromDB,
  getSingleStationFromDB,
  updateStationFromDB,
};
