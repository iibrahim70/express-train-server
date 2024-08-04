import httpStatus from 'http-status';
import catchAsync from '../../helpers/catchAsync';
import sendResponse from '../../helpers/sendResponse';
import { StationServices } from './station.service';

const createStation = catchAsync(async (req, res) => {
  const result = await StationServices.createStationFromDB(
    req?.user,
    req?.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Station created successfully!',
    data: result,
  });
});

const getAllStations = catchAsync(async (req, res) => {
  const result = await StationServices.getAllStationsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All stations retrieved successfully!',
    data: result,
  });
});

const getSingleStation = catchAsync(async (req, res) => {
  const result = await StationServices.getSingleStationFromDB(
    req?.params?.stationId,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Station retrieved successfully!',
    data: result,
  });
});

const updateStation = catchAsync(async (req, res) => {
  const result = await StationServices.updateStationFromDB(
    req?.params?.stationId,
    req?.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Station updated successfully!',
    data: result,
  });
});

export const StationControllers = {
  createStation,
  getAllStations,
  getSingleStation,
  updateStation,
};
