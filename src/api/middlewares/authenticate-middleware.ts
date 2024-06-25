import { APIError } from "@app/utils";
import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import passport from "passport";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate("jwt", { session: false }, function (err, user) {
    if (err) {
      console.info(err);

      return next(
        new APIError({
          message: "unauthorized",
          status: httpStatus.UNAUTHORIZED,
        })
      );
    }
    if (!user) {
      return next(
        new APIError({
          message: "unauthorized",
          status: httpStatus.UNAUTHORIZED,
        })
      );
    } else {
      req.user = user;
      return next();
    }
  })(req, res, next);
};
