import morgan from "morgan";
import { httpAccessLogger } from "@app/config/logger";

const stream: morgan.StreamOptions = {
  write: (message) =>
    httpAccessLogger.info(message.substring(0, message.lastIndexOf("\n"))),
};

export const httpLogger = morgan("combined", { stream });
