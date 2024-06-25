# TypeScript Node Express 

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [List of Packages](#list-of-packages)
- [Sample Environment File](#sample-environment-file)
- [Recommended Workflow](#recommended-workflow)
- [Naming Convention](#naming-convention)
- [Future Plans](#future-plans)

## Prerequisites

- [NodeJS](https://nodejs.org/)
- TypeScript
- Eslint
- Postgres

## Getting Started

```bash
# Install dependencies for the host
npm install

# Start the application
npm start
```

## Project Structure

| Name                                                                                            | Description                                                                                                                                                                                                                        |
| ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **logs**/access.log                                                                             | HTTP access logs by the `morgan` request middleware.                                                                                                                                                                               |
| **logs**/combined.log                                                                           | All logs logged by the `logger` function in `logger.util.ts`.                                                                                                                                                                      |
| **logs**/errors.log                                                                             | Error logs logged by the `logger` function in `logger.util.ts`.                                                                                                                                                                    |
| **logs**/exceptions.log                                                                         | Unhandled exceptions logs logged by the `logger` function in `logger.util.ts`.                                                                                                                                                     |
| **config**/\*                                                                               | Any app level environment configs should go here.                                                                                                                                                                                  |
| **config**/container.ts                                                                               | Container for our Dependency injector                                                                                                                                                                                  |
| **src/api**/constants/enums.ts                                   | Enumeration interfaces.                                                                                                                                                                                                                  |
| **src/api**/controllers/`<feature-name>`/`<feature-name>`-controller.ts                                   | Controller files.                                                                                                                                                                                                                  |
| **src/api**/dto/`<feature-name>`-dto.ts                                   | Data Transfer objects. Used to encapsulate data between processes.                                                                                                                                                                                                                  |
| **src/api**/middlewares/*.ts                                   | Express middlewares |
| **src/api**/repositories/`<feature-name>`.ts                                   | Interfaces that abstract the service implementation |
| **src/api**/routes/`<feature-name>`/`<feature-name>`-route.ts                                   | Express routers |
| **src/api**/routes/`<feature-name>`/`<feature-name>`-validation.ts                                   | Request body validators for the `<feature-name>`-route.ts files |
| **src/api**/services/`<service-name>`/`<service-name>`-service.ts                              | Business Logic services.                                                                                                                                                                                                           |
| **src/api**/utils/*.ts                             | Utility methods used for the application                                                                                                                                                                                                           |
| **test**/`<module>`/`<feature-name>`.ts                             | Unit test files |
| .gitignore                                                                                      | Folder and files ignored by git.                                                                                                                                                                                                   |
| .env.sample                                                                                      | Sample Environment parameters used mainly for configuration                                                                                                                                                                                                   |
| knexfile.ts                                                                                     | KnexJS configuration file that contains database config.                                                                                                                                                                           |
| .eslintignorets                                                                                     | Folders ignored by eslint                                                                                                                                                                            |
| .eslintrc                                                                                     | Eslint configuration                                                                                                                                                                            |
| nodemon.json                                                                                    | Nodemon (file watcher) configuration file.                                                                                                                                                                                         |
| package.json                                                                                    | NPM dependencies.                                                                                                                                                                                                                  |
| package-lock.json                                                                               | Contains exact versions of NPM dependencies in package.json.                                                                                                                                                                       |
| tsconfig.json                                                                                   | Contains typescript configuration for this project.                                                                                                                                                                                |

**Note:** This project structure makes use of **barrel files**, those **index.ts** you see on most of the folders. These barrel files are then used by the `paths` property in `tsconfig.json` for pretty imports. Make sure not to forget this by always exporting the newly created files to their respective **barrel files (index.ts)** if applicable!


## Sample Environment File

This project contains a `.env.sample` file that you can use. Rename it to `.env` and modify the contents to your needs. 

```dotenv
NODE_ENV: Joi.string()
.allow('development', 'production', 'test', 'provision')
.default('development'),
PORT: Joi.number()
.default(4040),
JWT_SECRET: Joi.string().required()
CONNECTION_STR: Joi.string().required()
```

## Recommended Workflow

Keep in mind this layered architecture.

![image](https://user-images.githubusercontent.com/9653764/94946403-ac1a0700-050e-11eb-8df9-0ebe9c2ee366.png)

The folder structure of this project is mainly functionality-based so it should mostly be self explanatory where to put what.

### Create the corresponding ObjectionJS model

1. Create a TS file at `src/api/models/`.
1. Populate the file accordingly.
   - Make sure to set the static `tableName` property.
   - (Optional) Set the static `relationMappings` property if applicable. See ObjectionJS docs for more details.
   - Setup the model's properties based on your database table schema.
   - Refer to the [documentation](https://vincit.github.io/objection.js/) for more info.

### Create an interface (if applicable)

Sometimes we need more database functionality not specified at `IRepository.ts`.

1. Create a TS file of type interface at `src/api/repositories/` (take note of the filename e.g. `I<feature-name>.ts`).
1. Extend `IRepository` interface. Pass the objectionJS model defined in the previous step as the type parameter.
1. Add any methods that you need to abstract to the controller.

### Create the service (Data access layer)

1. Create a new file at `src/api/services/<service_name>`.
1. Create a class that implements `IRepository<Model>` or your custom interface if any.
1. Add the concrete implementation for the service

### Create the controller 

1. Create a new file at `src/api/controllers/<controller_name>`.
1. Create a new class.
1. Put your service in the constructor ( for our dependency injector )
1. This is where you put the methods used for your routers.

### Create the routes 

1. Create a new folder at `src/api/routes/<route name>`.
1. Create a new file under that folder. Name it `<feature>-route.ts`. Here is where we map the controller to our route
1. Create another file under that folder. Name it `<feature>-validation.ts`. Here we define the schema for the request body.


## Naming Convention

### For files and folders

Generally, use `kebab-case`.

In some cases, we include the file `functionality` in its file name in the format:

`<file-name>-<functionality>.<extension>`

For example:

- user`-service`.ts
- user`-model`.ts
- bcrypt`-util`.ts

TypeScript `Interface` and `Type` file names should match their definition name.

For example:

| Interface/Type name       | File name                    |
| ------------------------- | ---------------------------- |
| `IRepository` | `IRepository`.ts |
| `IUserRepository`           | `IUserRepository`.ts           |

## Deployment

Under construction

### Production

Under construction

### Test

Under construction

## Future Plans

- Testing