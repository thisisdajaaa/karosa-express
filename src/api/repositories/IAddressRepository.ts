import { IRepository } from "./IRepository";
import {
  AddressModel,
  ProvinceModel,
  CityModel,
  BarangayModel,
} from "@app/models";

export interface IAddressRepository extends IRepository<AddressModel> {
  getAddressByUserId(userId: string): Promise<AddressModel[]>;
  getShopAddressByUserId(userId: string): Promise<AddressModel>;
}

export interface IProvinceRepository {
  getProvincesByRegionId(regionId: string): Promise<ProvinceModel[]>;
}

export interface ICityRepository {
  getCitiesBytProvinceId(provinceId: string): Promise<CityModel[]>;
}

export interface IBarangayRepository {
  getBarangaysByCityId(cityId: string): Promise<BarangayModel[]>;
}
