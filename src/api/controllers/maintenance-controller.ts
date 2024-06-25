import { Request, Response, NextFunction } from "express";
import { IMaintenanceRepository } from "@app/repositories";
import { APIError } from "../utils/APIError";
import httpStatus from "http-status";

export class MaintenanceController {
  private maintenanceService: IMaintenanceRepository;

  constructor(maintenanceService: IMaintenanceRepository) {
    this.maintenanceService = maintenanceService;
  }

  checkDB = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.send(await this.maintenanceService.checkDB());
      console.info("[OK] PG DB");
    } catch (error) {
      next(
        new APIError({
          message: "[FAILED] PG DB",
          status: httpStatus.CONFLICT,
          stack: error ? error.stack : undefined,
        })
      );
    }
  };
}
