import { AddressModel } from "@app/models";
import { IAddressRepository, IShopRepository } from "@app/repositories";
import { NextFunction, Request, Response } from "express";
import { APIError } from "@app/utils";
import httpStatus from "http-status";
import { Address_Type } from "../constants/enums";

export class ShopController {
  private shopService: IShopRepository;
  private addressService: IAddressRepository;

  constructor(
    shopService: IShopRepository,
    addressService: IAddressRepository
  ) {
    this.shopService = shopService;
    this.addressService = addressService;
  }

  addAddress = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(
        new APIError({
          message: "User is unauthorized",
          status: httpStatus.UNAUTHORIZED,
        })
      );
    }
    const address = await this.addressService.getShopAddressByUserId(
      req.user.id
    );

    if (address) {
      return next(
        new APIError({
          message: "A Shop can only have one address!",
          status: httpStatus.FORBIDDEN,
        })
      );
    }
    const {
      name,
      phoneNo,
      detailed_address,
      isDefaultAddress,
      barangayId,
    } = req.body;
    const params: AddressModel = new AddressModel();
    params.name = name;
    params.type = Address_Type.Shop;
    params.phoneNo = phoneNo;
    params.detailed_address = detailed_address;
    params.isDefaultAddress = isDefaultAddress;
    params.barangayId = barangayId;
    params.userId = req.user.id;

    return res.send(await this.addressService.create(params));
  };

  updateAddress = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(
        new APIError({
          message: "User is unauthorized",
          status: httpStatus.UNAUTHORIZED,
        })
      );
    }

    const address = await this.addressService.getShopAddressByUserId(
      req.user.id
    );

    if (!address) {
      return next(
        new APIError({
          message: "Address not found!",
          status: httpStatus.NOT_FOUND,
        })
      );
    }
    if (address.userId !== req.user.id) {
      return next(
        new APIError({
          message: "Not Authorized!",
          status: httpStatus.UNAUTHORIZED,
        })
      );
    }

    return res.send(await this.addressService.update(address.id, req.body));
  };

  getAddress = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(
        new APIError({
          message: "User is unauthorized",
          status: httpStatus.UNAUTHORIZED,
        })
      );
    }
    return res.send(
      await this.addressService.getShopAddressByUserId(req.user.id)
    );
  };

  getAllShops = async (_req: Request, res: Response) => {
    return res.send(await this.shopService.get());
  };
}
