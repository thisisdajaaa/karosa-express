import { env } from "@app/config/environment";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: env.cloudinary.cloudName,
  api_key: env.cloudinary.apiKey,
  api_secret: env.cloudinary.apiSecret,
});

export { cloudinary };
