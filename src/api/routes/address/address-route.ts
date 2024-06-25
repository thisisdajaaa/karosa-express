import express from "express";
import asyncHandler from "express-async-handler";
import { AddressController } from "@app/controllers";
import { makeInvoker } from "awilix-express";
const router = express.Router();

const api = makeInvoker(AddressController);

router.route("/regions").get(asyncHandler(api("getRegions")));

router
  .route("/:regionId/provinces")
  .get(asyncHandler(api("getProvincesByRegionId")));

router
  .route("/:provinceId/cities")
  .get(asyncHandler(api("getCitiesBytProvinceId")));

router
  .route("/:cityId/barangays")
  .get(asyncHandler(api("getBarangaysByCityId")));

export default router;
