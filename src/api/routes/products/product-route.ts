import express from "express";
import asyncHandler from "express-async-handler";
import { authenticate } from "@app/middlewares";
import { ProductController } from "@app/controllers";
import { makeInvoker } from "awilix-express";
import { validate } from "express-validation";
import paramsValidation from "./product-validation";
const router = express.Router();

const api = makeInvoker(ProductController);
/**
 * @swagger
 * tags:
 *    - name: Products
 *      description: Products
 */

/**
 * @swagger
 *
 * /v1/products?search={product name}:
 *   get:
 *     tags: [Products]
 *     summary: Returns a list of products search
 *     responses:
 *       '200':    # status code
 *         description: A JSON array of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
router
  .route("/")
  .get(asyncHandler(api("getProducts")))
  .post(
    validate(paramsValidation.createProduct),
    authenticate,
    asyncHandler(api("addProduct"))
  );

/**
 * @swagger
 *
 * /v1/products/{productId}:
 *   get:
 *     tags: [Products]
 *     summary: Returns a single product
 *     parameters:
 *      - in: path
 *        name: productId
 *        schema:
 *          type: integer
 *        required: true
 *        description: Numeric ID of the product to get
 *     responses:
 *       '200':    # status code
 *         description: Product object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 type: string
 */
router
  .route("/:productId")
  .get(asyncHandler(api("get")))
  .put(
    validate(paramsValidation.updateProduct),
    authenticate,
    asyncHandler(api("updateProduct"))
  )
  .delete(authenticate, asyncHandler(api("deleteProduct")));

/**
 * @swagger
 *
 * /v1/products/{productId}/reviews:
 *   get:
 *     tags: [Products]
 *     summary: Returns a single product
 *     parameters:
 *      - in: path
 *        name: productId
 *        schema:
 *          type: integer
 *        required: true
 *        description: Numeric ID of the product to get
 *     responses:
 *       '200':    # status code
 *         description: Reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router
  .route("/:productId/reviews")
  .get(asyncHandler(api("getReviews")))
  .post(
    validate(paramsValidation.addReview),
    authenticate,
    asyncHandler(api("addProductReview"))
  );

/**
 * @swagger
 *
 * /v1/products/{productId}/reviews/{reviewId}:
 *   get:
 *     tags: [Products]
 *     produces:
 *       - application/json
 */
router
  .route("/:productId/reviews/:reviewId")
  .put(
    validate(paramsValidation.updateReview),
    authenticate,
    asyncHandler(api("updateProductReview"))
  );

router
  .route("/:productId/variations")
  .post(
    validate(paramsValidation.createVariation),
    authenticate,
    asyncHandler(api("addVariation"))
  );

router
  .route("/:productId/variations/:variationId")
  .get(authenticate, asyncHandler(api("getVariation")))
  .delete(authenticate, asyncHandler(api("deleteVariation")))
  .put(
    validate(paramsValidation.updateVariation),
    authenticate,
    asyncHandler(api("updateVariation"))
  );

export default router;
