import { IMaintenanceRepository } from "../repositories/IMaintenanceRepository";
import Knex from "knex";
import config from "../../../knexfile";

const knex = Knex(config);

class MaintenanceService implements IMaintenanceRepository {
  async checkDB(): Promise<boolean> {
    await knex.raw("select 1+1 as result");
    return true;
  }
}

export default MaintenanceService;
