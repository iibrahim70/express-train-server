import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';
import { IStation } from './station.interface';
import { Station } from './station.model';

const createStationFromDB = async (payload: IStation) => {
  // Check if a station with the provided stationCode already exists
  if (await Station.isStationExistsByStationCode(payload?.stationCode)) {
    // If user already exists, throw a CONFLICT ApiError
    throw new ApiError(httpStatus.CONFLICT, 'Station already exists!');
  }

  // If station does not exist, create the new station
  const result = await Station.create(payload);
  return result;
};

const getAllStationsFromDB = async () => {
  const result = await Station.find();
  return result;
};

const getSingleStationFromDB = async (stationId: string) => {
  const result = await Station.findById(stationId);

  // If no station is found with the provided ID, throw a NOT_FOUND ApiError
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Station not found with this ID!');
  }

  return result;
};

const updateStationFromDB = async (stationId: string, payload: IStation) => {
  const result = await Station.findByIdAndUpdate(stationId, payload, {
    new: true,
  });

  // If no station is found with the provided ID, throw a NOT_FOUND ApiError
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Station not found with this ID!');
  }

  return result;
};

export const StationServices = {
  createStationFromDB,
  getAllStationsFromDB,
  getSingleStationFromDB,
  updateStationFromDB,
};
