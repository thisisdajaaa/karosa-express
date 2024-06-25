import swaggerJsdoc from "swagger-jsdoc";

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Karosa Express API with Swagger",
      version: "0.1.0",
      description: "Karosa API documentation for internal use",
    },
  },
  apis: ["src/api/routes/**/*-route.ts"],
};

export const swaggerSpecs = swaggerJsdoc(options);
