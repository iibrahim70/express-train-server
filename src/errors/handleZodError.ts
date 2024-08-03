import { ZodError, ZodIssue } from 'zod';
import {
  IErrorSources,
  IGenericErrorResponse,
} from '../interfaces/error.interface';
import httpStatus from 'http-status';

const handleZodError = (err: ZodError): IGenericErrorResponse => {
  const errorSources: IErrorSources[] = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  return {
    statusCode: httpStatus.BAD_REQUEST,
    message: 'Validation Error',
    errorSources,
  };
};

export default handleZodError;
