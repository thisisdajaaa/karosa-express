import { Request, Response, NextFunction } from "express";
import { APIError } from "@app/utils";
import httpStatus from "http-status";
import {
  IProvinceRepository,
  ICityRepository,
  IBarangayRepository,
  IRegionRepository,
} from "@app/repositories";

export class AddressController {
  private regionService: IRegionRepository;
  private provinceService: IProvinceRepository;
  private cityService: ICityRepository;
  private barangayService: IBarangayRepository;

  constructor(
    regionService: IRegionRepository,
    provinceService: IProvinceRepository,
    cityService: ICityRepository,
    barangayService: IBarangayRepository
  ) {
    this.regionService = regionService;
    this.provinceService = provinceService;
    this.cityService = cityService;
    this.barangayService = barangayService;
  }

  getRegions = async (req: Request, res: Response) => {
    const regions = await this.regionService.get();
    res.send(regions);
  };

  getProvincesByRegionId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { regionId } = req.params;

    try {
      const provinces = await this.provinceService.getProvincesByRegionId(
        regionId
      );
      return res.send(provinces);
    } catch (error) {
      return next(
        new APIError({
          message: "Error in retrieving the provinces",
          status: httpStatus.NOT_FOUND,
          stack: error ? error.stack : undefined,
        })
      );
    }
  };

  getCitiesBytProvinceId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { provinceId } = req.params;

    try {
      const cities = await this.cityService.getCitiesBytProvinceId(provinceId);
      return res.send(cities);
    } catch (error) {
      return next(
        new APIError({
          message: "Error in retrieving the cities",
          status: httpStatus.NOT_FOUND,
          stack: error ? error.stack : undefined,
        })
      );
    }
  };

  getBarangaysByCityId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { cityId } = req.params;

    try {
      const barangays = await this.barangayService.getBarangaysByCityId(cityId);
      return res.send(barangays);
    } catch (error) {
      return next(
        new APIError({
          message: "Error in retrieving the barangays",
          status: httpStatus.NOT_FOUND,
          stack: error ? error.stack : undefined,
        })
      );
    }
  };
}
