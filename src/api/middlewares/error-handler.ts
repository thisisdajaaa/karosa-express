/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import { Response, Request, NextFunction } from "express";
import expressValidation from "express-validation";
import { APIError } from "@app/utils";
import { env } from "@app/config/environment";
import { logger } from "@app/config/logger";
import { v4 as uuidv4 } from "uuid";

/**
 * Error handler. Send stacktrace only during development
 * @public
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handler = (
  err: APIError,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  const response = {
    code: err.status,
    message: err.message,
    errors: err.errors,
    stack: err.stack,
  };

  if (env.env !== "development") {
    delete response.stack;
  }

  logger.error(uuidv4() + " " + err.message);
  res.status(err.status);
  return res.json(response);
};

/**
 * If error is not an instanceOf APIError, convert it.
 * @public
 */

export const converter = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let convertedError = err;

  if (err instanceof expressValidation.ValidationError) {
    convertedError = new APIError({
      message: "Validation Error",
      errors: err.error,
      status: err.statusCode,
      stack: err.details,
    });
  } else if (!(err instanceof APIError)) {
    convertedError = new APIError({
      message: err.message,
      status: err.status,
      stack: err.stack,
    });
  }

  return handler(convertedError, req, res, next);
};

/**
 * Catch 404 and forward to error handler
 * @public
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const err = new APIError({
    message: "Not found",
    status: httpStatus.NOT_FOUND,
  });

  return handler(err, req, res, next);
};
