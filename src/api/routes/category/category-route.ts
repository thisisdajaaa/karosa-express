import express from "express";
import asyncHandler from "express-async-handler";
import { CategoryController } from "@app/controllers";
import { makeInvoker } from "awilix-express";
const router = express.Router();

const api = makeInvoker(CategoryController);

/**
 * @swagger
 * tags:
 *    - name: Category
 *      description: Categories
 */

/**
 * @swagger
 *
 * /v1/categories:
 *   get:
 *     tags: [Category]
 *     summary: Returns a list of Categories
 *     responses:
 *       '200':    # status code
 *         description: A JSON array of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.route("/").get(asyncHandler(api("retrieve")));

export default router;
