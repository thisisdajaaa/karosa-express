import express from "express";
import { validate } from "express-validation";
import { paramsValidation } from "./auth-validation";
import asyncHandler from "express-async-handler";
import { AuthController } from "@app/controllers";
import { makeInvoker } from "awilix-express";
import { authenticate } from "@app/middlewares";

const router = express.Router();

const api = makeInvoker(AuthController);

/**
 * @swagger
 * tags:
 *    - name: Authentication
 *      description: Authentication Endpoint
 */

/**
 * @swagger
 *
 * /auth/login:
 *   post:
 *     tags: [Authentication]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: identifier
 *         in: formData
 *         required: true
 *         type: string
 *         description: Can be phone number, username, or email
 *       - name: password
 *         in: formData
 *         required: true
 *         type: string
 *         description: The password of the user
 */
router
  .route("/login")
  .post(validate(paramsValidation.auth), asyncHandler(api("login")));

/**
 * @swagger
 *
 * /auth/register:
 *   post:
 *     tags: [Authentication]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: identifier
 *         in: formData
 *         required: true
 *         type: string
 *         description: Can be phone number, username, or email
 *       - name: password
 *         in: formData
 *         required: true
 *         type: string
 *         description: The password of the user
 */
router
  .route("/register")
  .post(validate(paramsValidation.auth), asyncHandler(api("register")));

/**
 * @swagger
 *
 * /auth/changePassword:
 *   post:
 *     tags: [Authentication]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: oldPassword
 *         in: formData
 *         required: true
 *         type: string
 *       - name: newPassword
 *         in: formData
 *         required: true
 *         type: string
 */
router
  .route("/changePassword")
  .post(
    validate(paramsValidation.changePassword),
    authenticate,
    asyncHandler(api("changePassword"))
  );

export default router;
