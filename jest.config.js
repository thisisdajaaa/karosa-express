module.exports = {
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.json",
    },
  },
  moduleFileExtensions: ["ts", "js"],
  moduleNameMapper: {
    "@app/config/(.*)": "<rootDir>/src/config/$1",
    "@app/routes": "<rootDir>/src/api/routes",
    "@app/controllers": "<rootDir>/src/api/controllers",
    "@app/dto": "<rootDir>/src/api/dto",
    "@app/models": "<rootDir>/src/api/models",
    "@app/utils": "<rootDir>/src/api/utils",
    "@app/middlewares": "<rootDir>/src/api/middlewares",
    "@app/services": "<rootDir>/src/api/services",
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testMatch: ["**/test/**/*.test.(ts|js)"],
  testEnvironment: "node",
};
