import express from "express";
import asyncHandler from "express-async-handler";
import { MaintenanceController } from "@app/controllers";
import { makeInvoker } from "awilix-express";
const router = express.Router();

const api = makeInvoker(MaintenanceController);

router.route("/").get(asyncHandler(api("checkDB")));

export default router;
