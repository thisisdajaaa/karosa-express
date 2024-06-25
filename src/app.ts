import "tsconfig-paths/register";
import { env } from "@app/config/environment";
import { createServer } from "http";
import express from "express";
import compress from "compression";
import methodOverride from "method-override";
import helmet from "helmet";
import { router as routes } from "@app/routes";
import { httpLogger } from "@app/middlewares";
import { Model } from "objection";
import knexConfig from "../knexfile";
import Knex from "knex";
import {
  converter,
  handler,
  notFound,
  expressMonitor,
  corsMiddleware,
} from "@app/middlewares";
import { scopePerRequest } from "awilix-express";
import { container } from "@app/config/container";
import passport from "passport";
import cookieParser from "cookie-parser";
import "./api/passport";

/**
 * Express instance
 * @public
 */

const app = express();

(async () => {
  const knex = Knex(knexConfig);
  Model.knex(knex);

  // secure apps by setting various HTTP headers
  app.use(helmet({ contentSecurityPolicy: false }));
  app.disable("etag").disable("x-powered-by");

  // enable CORS - Cross Origin Resource Sharing
  app.use(corsMiddleware());

  app.use(expressMonitor());

  app.use(scopePerRequest(container));

  app.use(httpLogger);

  // parse body params and attache them to req.body
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(cookieParser(env.cookieSecret));

  // gzip compression
  app.use(compress());

  // lets you use HTTP verbs such as PUT or DELETE
  // in places where the client doesn't support it
  app.use(methodOverride());

  app.use(passport.initialize());

  // mount api v1 routes
  app.use("/v1", routes);

  // if error is not an instanceOf APIError, convert it.
  app.use(converter);

  // catch 404 and forward to error handler
  app.use(notFound);

  // error handler, send stacktrace only during development
  app.use(handler);

  // listen to requests
  const httpServer = createServer(app);
  httpServer.listen(env.port, () => {
    console.info(`Server is now up @ ${env.port}`);
  });
})();

export default app;
