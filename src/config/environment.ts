import Joi from "joi";
import dotenv from "dotenv";
dotenv.config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow("development", "production", "test", "provision")
    .default("development"),
  PORT: Joi.number().default(4040),
  JWT_SECRET: Joi.string().default("qz99DuJ!N@heVXzEAhwP7@b"),
  COOKIE_SECRET: Joi.string().default("cL^7J956&UTePs3ziHK^UFC"),
  CONNECTION_STR: Joi.string().default(
    "postgresql://postgres:password@db:5432/db"
  ),
  CLOUDINARY_NAME: Joi.string().default("sample"),
  CLOUDINARY_KEY: Joi.string().default("sample"),
  CLOUDINARY_SECRET: Joi.string().default("sample"),
})
  .unknown()
  .required();

const { error, value: envVars } = envVarsSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}
interface ICloudinary {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
}

interface IEnvironment {
  env: string;
  port: number;
  jwtSecret: string;
  cookieSecret: string;
  connectionString: string;
  cloudinary: ICloudinary;
}

export const env: IEnvironment = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  jwtSecret: envVars.JWT_SECRET,
  cookieSecret: envVars.COOKIE_SECRET,
  connectionString: envVars.CONNECTION_STR,
  cloudinary: {
    apiKey: envVars.CLOUDINARY_KEY,
    apiSecret: envVars.CLOUDINARY_SECRET,
    cloudName: envVars.CLOUDINARY_NAME,
  },
};
