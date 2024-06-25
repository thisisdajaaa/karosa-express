import express from "express";
import asyncHandler from "express-async-handler";
import { ShopController } from "@app/controllers";
import { makeInvoker } from "awilix-express";
import { authenticate } from "@app/middlewares";
import { validate } from "express-validation";
import paramsValidation from "./shop-validation";

const router = express.Router();

const api = makeInvoker(ShopController);

router.route("/").get(authenticate, asyncHandler(api("getAllShops")));

router
  .route("/address")
  .get(authenticate, asyncHandler(api("getAddress")))
  .post(
    validate(paramsValidation.addAddress),
    authenticate,
    asyncHandler(api("addAddress"))
  )
  .put(
    validate(paramsValidation.updateAddress),
    authenticate,
    asyncHandler(api("updateAddress"))
  );

export default router;
