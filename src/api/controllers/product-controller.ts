import { NextFunction, Request, Response } from "express";
import {
  IProductRepository,
  IReviewRepository,
  IUserRepository,
  IVariationRepository,
} from "@app/repositories";
import { APIError } from "@app/utils";
import httpStatus from "http-status";
import { convertProductEntity } from "@app/dto";
import { ProductModel, VariationModel, ReviewModel } from "@app/models";

export class ProductController {
  private productService: IProductRepository;
  private reviewService: IReviewRepository;
  private userService: IUserRepository;
  private variationService: IVariationRepository;
  constructor(
    productService: IProductRepository,
    reviewService: IReviewRepository,
    userService: IUserRepository,
    variationService: IVariationRepository
  ) {
    this.productService = productService;
    this.userService = userService;
    this.reviewService = reviewService;
    this.variationService = variationService;
  }

  getAll = async (_req: Request, res: Response) => {
    const productDetails = await this.productService.get();
    return res.send(productDetails);
  };

  addProduct = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(
        new APIError({
          message: "User is unauthorized",
          status: httpStatus.UNAUTHORIZED,
        })
      );
    }
    const { name, categoryId, description } = req.body;
    const user = await this.userService.getById(req.user.id);

    if (user.shopId === null) {
      return next(
        new APIError({
          message: "You don't have a shop! Create one first.",
          status: httpStatus.UNAUTHORIZED,
        })
      );
    }

    const params: ProductModel = new ProductModel();
    params.name = name;
    params.categoryId = categoryId;
    params.description = description;
    params.shopId = user.shopId;

    return res.send(await this.productService.create(params));
  };

  updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(
        new APIError({
          message: "User is unauthorized",
          status: httpStatus.UNAUTHORIZED,
        })
      );
    }
    const { productId } = req.params;
    const product = await this.productService.getById(productId);
    const user = await this.userService.getById(req.user.id);

    if (!product) {
      return next(
        new APIError({
          message: "Product not found!",
          status: httpStatus.NOT_FOUND,
        })
      );
    }

    if (product.shopId !== user.shopId) {
      return next(
        new APIError({
          message: "Not Authorized!",
          status: httpStatus.UNAUTHORIZED,
        })
      );
    }

    try {
      const productDetails = await this.productService.update(
        productId,
        req.body
      );
      return res.send(productDetails);
    } catch (error) {
      return next(
        new APIError({
          message: "Error in updating product",
          status: httpStatus.CONFLICT,
          stack: error ? error.stack : undefined,
        })
      );
    }
  };

  deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(
        new APIError({
          message: "User is unauthorized",
          status: httpStatus.UNAUTHORIZED,
        })
      );
    }
    const { productId } = req.params;
    const product = await this.productService.getById(productId);
    const user = await this.userService.getById(req.user.id);

    if (!product) {
      return next(
        new APIError({
          message: "Product not found!",
          status: httpStatus.NOT_FOUND,
        })
      );
    }

    if (product.shopId !== user.shopId) {
      return next(
        new APIError({
          message: "Not Authorized!",
          status: httpStatus.UNAUTHORIZED,
        })
      );
    }

    try {
      const productDetails = await this.productService.delete(productId);
      return res.send(productDetails);
    } catch (error) {
      return next(
        new APIError({
          message: "Error in deleting product",
          status: httpStatus.CONFLICT,
          stack: error ? error.stack : undefined,
        })
      );
    }
  };

  getVariations = async (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.params;
    const product = await this.productService.getById(productId);

    if (!product) {
      return next(
        new APIError({
          message: "Product not found!",
          status: httpStatus.NOT_FOUND,
        })
      );
    }

    return res.send(
      await this.variationService.getVariationsByProductID(Number(productId))
    );
  };

  addVariation = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(
        new APIError({
          message: "User is unauthorized",
          status: httpStatus.UNAUTHORIZED,
        })
      );
    }
    const { name, price, stock, photo, weight, shelf_life } = req.body;
    const params: VariationModel = new VariationModel();
    const { productId } = req.params;
    const product = await this.productService.getById(productId);
    const user = await this.userService.getById(req.user.id);

    if (!product) {
      return next(
        new APIError({
          message: "Product not found!",
          status: httpStatus.NOT_FOUND,
        })
      );
    }

    if (product.shopId !== user.shopId) {
      return next(
        new APIError({
          message: "Not Authorized!",
          status: httpStatus.UNAUTHORIZED,
        })
      );
    }

    params.name = name;
    params.price = price;
    params.stock = stock;
    params.photo = photo;
    params.weight = weight;
    params.shelf_life = shelf_life;
    params.productId = product.id;

    return res.send(await this.variationService.create(params));
  };

  getVariation = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(
        new APIError({
          message: "User is unauthorized",
          status: httpStatus.UNAUTHORIZED,
        })
      );
    }
    const { productId, variationId } = req.params;
    const product = await this.productService.getById(productId);
    const user = await this.userService.getById(req.user.id);

    if (!product) {
      return next(
        new APIError({
          message: "Product not found!",
          status: httpStatus.NOT_FOUND,
        })
      );
    }

    if (product.shopId !== user.shopId) {
      return next(
        new APIError({
          message: "Not Authorized!",
          status: httpStatus.UNAUTHORIZED,
        })
      );
    }
    const variation = await this.variationService.getById(variationId);

    if (!variation) {
      return next(
        new APIError({
          message: "Variation not found!",
          status: httpStatus.NOT_FOUND,
          stack: undefined,
        })
      );
    }

    return res.send(variation);
  };

  updateVariation = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(
        new APIError({
          message: "User is unauthorized",
          status: httpStatus.UNAUTHORIZED,
        })
      );
    }
    const { productId, variationId } = req.params;
    const user = await this.userService.getById(req.user.id);
    const product = await this.productService.getById(productId);

    if (!product) {
      return next(
        new APIError({
          message: "Product not found!",
          status: httpStatus.NOT_FOUND,
        })
      );
    }

    if (product.shopId !== user.shopId) {
      return next(
        new APIError({
          message: "Not Authorized!",
          status: httpStatus.UNAUTHORIZED,
        })
      );
    }
    const variation = await this.variationService.getById(variationId);

    if (!variation) {
      return next(
        new APIError({
          message: "Variation not found!",
          status: httpStatus.NOT_FOUND,
        })
      );
    }

    return res.send(await this.variationService.update(variationId, req.body));
  };

  deleteVariation = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(
        new APIError({
          message: "User is unauthorized",
          status: httpStatus.UNAUTHORIZED,
        })
      );
    }
    const { productId, variationId } = req.params;
    const user = await this.userService.getById(req.user.id);
    const product = await this.productService.getById(productId);

    if (!product) {
      return next(
        new APIError({
          message: "Product not found!",
          status: httpStatus.NOT_FOUND,
        })
      );
    }

    if (product.shopId !== user.shopId) {
      return next(
        new APIError({
          message: "Not Authorized!",
          status: httpStatus.UNAUTHORIZED,
        })
      );
    }
    const variation = await this.variationService.getById(variationId);

    if (!variation) {
      return next(
        new APIError({
          message: "Variation not found!",
          status: httpStatus.NOT_FOUND,
        })
      );
    }

    return res.send(await this.variationService.delete(variationId));
  };

  get = async (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.params;
    const product = await this.productService.getById(productId);

    if (!product) {
      return next(
        new APIError({
          message: "Product not found!",
          status: httpStatus.NOT_FOUND,
        })
      );
    }

    try {
      return res.send(convertProductEntity(product));
    } catch (error) {
      return next(
        new APIError({
          message: "Error in retrieving product",
          status: httpStatus.CONFLICT,
          stack: error ? error.stack : undefined,
        })
      );
    }
  };

  getReviews = async (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.params;
    const product = await this.productService.exists(productId);

    if (!product) {
      return next(
        new APIError({
          message: "Product not found!",
          status: httpStatus.NOT_FOUND,
        })
      );
    }

    return res.send(
      await this.reviewService.getReviewsByProductId(Number(productId))
    );
  };

  // TODO: can only add review if the user has received the order
  addProductReview = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user) {
      return next(
        new APIError({
          message: "User is unauthorized",
          status: httpStatus.UNAUTHORIZED,
        })
      );
    }

    const { comment, rating } = req.body;
    const params: ReviewModel = new ReviewModel();
    const { productId } = req.params;
    const product = await this.productService.getById(productId);
    const user = await this.userService.getById(req.user.id);
    const productOwner = await this.userService.getByShopId(product.shopId);

    if (!product) {
      return next(
        new APIError({
          message: "Product not found!",
          status: httpStatus.NOT_FOUND,
        })
      );
    }

    if (product.shopId === user.shopId) {
      return next(
        new APIError({
          message: "You can't add a review to your own product!",
          status: httpStatus.UNAUTHORIZED,
        })
      );
    }

    params.productId = Number(productId);
    params.comment = comment;
    params.rating = rating;
    params.reviewerId = req.user.id;
    params.revieweeId = productOwner.id;

    return res.send(await this.reviewService.create(params));
  };

  updateProductReview = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ReviewModel> | void> => {
    if (!req.user) {
      return next(
        new APIError({
          message: "User is unauthorized",
          status: httpStatus.UNAUTHORIZED,
        })
      );
    }
    const { productId, reviewId } = req.params;
    // const user = await this.userService.getById(req.user!.id);
    const product = await this.productService.getById(productId);

    if (!product) {
      return next(
        new APIError({
          message: "Product not found!",
          status: httpStatus.NOT_FOUND,
        })
      );
    }

    const review = await this.reviewService.getById(reviewId);

    if (!review) {
      return next(
        new APIError({
          message: "Review not found!",
          status: httpStatus.NOT_FOUND,
        })
      );
    }

    if (review.reviewerId !== req.user.id) {
      return next(
        new APIError({
          message: "Not Authorized!",
          status: httpStatus.UNAUTHORIZED,
        })
      );
    }

    return res.send(await this.reviewService.update(reviewId, req.body));
  };

  getProducts = async (req: Request, res: Response, next: NextFunction) => {
    const param = req.query.search;
    if (param === "" || param === undefined) {
      return res.send(await this.productService.get());
    }
    const products = await this.productService.getProducts(String(param));
    if (products.length === 0) {
      return next(
        new APIError({
          message: "No Products found!",
          status: httpStatus.OK,
        })
      );
    }

    return res.send(products);
  };
}
