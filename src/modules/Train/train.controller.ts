import httpStatus from 'http-status';
import catchAsync from '../../helpers/catchAsync';
import sendResponse from '../../helpers/sendResponse';
import { TrainServices } from './train.service';
import cron from 'node-cron';

const createTrain = catchAsync(async (req, res) => {
  const result = await TrainServices.createTrainFromDB(req?.user, req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Train created successfully!',
    data: result,
  });
});

const getAllTrains = catchAsync(async (req, res) => {
  const result = await TrainServices.getAllTrainsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All trains retrieved successfully!',
    data: result,
  });
});

const getSingleTrain = catchAsync(async (req, res) => {
  const result = await TrainServices.getSingleTrainFromDB(req.params.trainId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Train retrieved successfully!',
    data: result,
  });
});

const updateTrain = catchAsync(async (req, res) => {
  const result = await TrainServices.updateTrainFromDB(
    req.params.trainId,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Train updated successfully!',
    data: result,
  });
});

export const TrainControllers = {
  createTrain,
  getAllTrains,
  getSingleTrain,
  updateTrain,
};
