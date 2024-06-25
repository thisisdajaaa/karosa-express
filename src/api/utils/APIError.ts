/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";

/**
 * @extends Error
 */
class ExtendableError extends Error {
  public errors: any;
  public status: number;
  public isPublic: boolean;

  constructor({ message, errors, status, isPublic, stack }: any) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errors = errors;
    this.status = status;
    this.isPublic = isPublic;
    this.stack = stack;
    // Error.captureStackTrace(this, this.constructor.name);
  }
}

/**
 * Class representing an API error.
 * @extends ExtendableError
 */
export class APIError extends ExtendableError {
  /**
   * Creates an API error.
   * @param {string} message - Error message.
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   */
  constructor({
    message,
    errors,
    stack,
    status = httpStatus.INTERNAL_SERVER_ERROR,
    isPublic = false,
  }: any) {
    super({
      message,
      errors,
      status,
      isPublic,
      stack,
    });
  }
}
