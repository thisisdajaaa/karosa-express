import express from "express";
import userRoutes from "./users/user-route";
import authRoutes from "./auth/auth-route";
import categoriesRoutes from "./category/category-route";
import maintenanceRoutes from "./maintenance/maintenance.route";
import variationRoutes from "./variation/variation-route";
import shopRoutes from "./shop/shop-route";
import addressRoutes from "./address/address-route";
import productRoutes from "./products/product-route";
import swaggerUi from "swagger-ui-express";
import { swaggerSpecs } from "@app/middlewares";

const router = express.Router();

router.use("/maintenance", maintenanceRoutes);
router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/categories", categoriesRoutes);
router.use("/variations", variationRoutes);
router.use("/shops", shopRoutes);
router.use("/products", productRoutes);
router.use("/addresses", addressRoutes);
router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", swaggerUi.setup(swaggerSpecs));

export { router };
