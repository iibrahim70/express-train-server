import mongoose from 'mongoose';
import {
  IErrorSources,
  IGenericErrorResponse,
} from '../interfaces/error.interface';
import httpStatus from 'http-status';

const handleCastError = (
  err: mongoose.Error.CastError,
): IGenericErrorResponse => {
  const errorSources: IErrorSources[] = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  return {
    statusCode: httpStatus.BAD_REQUEST,
    message: httpStatus['400_MESSAGE'],
    errorSources,
  };
};

export default handleCastError;
