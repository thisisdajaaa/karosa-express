import express from "express";
import { validate } from "express-validation";
import { paramsValidation } from "./variation-validation";
import asyncHandler from "express-async-handler";
import { VariationController } from "@app/controllers";
import { makeInvoker } from "awilix-express";
import { authenticate } from "@app/middlewares";

const router = express.Router();

const api = makeInvoker(VariationController);

router
  .route("/")
  .post(
    validate(paramsValidation.create),
    authenticate,
    asyncHandler(api("add"))
  )
  .get(authenticate, asyncHandler(api("getAll")));

router
  .route("/:id")
  .get(authenticate, asyncHandler(api("getVariation")))
  .delete(authenticate, asyncHandler(api("delete")))
  .put(
    validate(paramsValidation.update),
    authenticate,
    asyncHandler(api("update"))
  );

export default router;
