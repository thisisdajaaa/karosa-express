import "tsconfig-paths/register";
import { Config } from "knex";
import { env } from "@app/config/environment";

const config: Config = {
  client: "pg",
  connection: env.connectionString,
  useNullAsDefault: true,

  // Modify this if you want to see the actual SQL queries executed thru knex
  debug: false,
};

export default config; // For application use
