import { UserController } from "@app/controllers";
import { authenticate, upload } from "@app/middlewares";
import { makeInvoker } from "awilix-express";
import express from "express";
import { validate } from "express-validation";
import { paramsValidation } from "./user-validation";
import asyncHandler from "express-async-handler";

const router = express.Router();

const api = makeInvoker(UserController);

router
  .route("/")
  .get(authenticate, asyncHandler(api("getUser")))
  .put(
    validate(paramsValidation.updateUser),
    authenticate,
    asyncHandler(api("updateUser"))
  );

router
  .route("/:userId/avatar")
  .post(
    validate(paramsValidation.updateUser),
    authenticate,
    upload.single("avatar"),
    asyncHandler(api("uploadImage"))
  )
  .delete(
    validate(paramsValidation.updateUser),
    authenticate,
    asyncHandler(api("deleteImage"))
  );

router
  .route("/isSeller")
  .get(authenticate, asyncHandler(api("validateSeller")));

router
  .route("/shop")
  .get(authenticate, asyncHandler(api("getShop")))
  .put(authenticate, asyncHandler(api("updateShop")))
  .post(authenticate, asyncHandler(api("addShop")))
  .delete(authenticate, asyncHandler(api("deleteShop")));

router
  .route("/addresses")
  .post(
    validate(paramsValidation.addAddress),
    authenticate,
    asyncHandler(api("addAddress"))
  )
  .get(authenticate, asyncHandler(api("getAddresses")));

router
  .route("/addresses/:addressId")
  .get(authenticate, asyncHandler(api("getAddress")))
  .delete(authenticate, asyncHandler(api("deleteAddress")))
  .put(
    validate(paramsValidation.updateAddress),
    authenticate,
    asyncHandler(api("updateAddress"))
  );

router.route("/:userId").get(asyncHandler(api("getUser")));
router
  .route("/shop/activate")
  .put(authenticate, asyncHandler(api("activateShop")));

router
  .route("/shop/disable")
  .put(authenticate, asyncHandler(api("disableShop")));

export default router;
