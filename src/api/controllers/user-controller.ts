import httpStatus from "http-status";
import { Request, Response, NextFunction } from "express";
import { IAddressRepository, IUserRepository } from "@app/repositories";
import { convertUserEntity, convertUserShopEntity } from "@app/dto";
import { APIError } from "@app/utils";
import { AddressModel } from "@app/models";
import { Address_Type } from "../constants/enums";

export class UserController {
  private userService: IUserRepository;
  private addressService: IAddressRepository;

  constructor(
    userService: IUserRepository,
    addressService: IAddressRepository
  ) {
    this.userService = userService;
    this.addressService = addressService;
  }

  getUser = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(
        new APIError({
          message: "User is unauthorized",
          status: httpStatus.UNAUTHORIZED,
        })
      );
    }

    try {
      const user = await this.userService.getById(req.user.id);
      return res.send(convertUserEntity(user));
    } catch (error) {
      return next(
        new APIError({
          message: "Error in retrieving user",
          status: httpStatus.CONFLICT,
          stack: error ? error.stack : undefined,
        })
      );
    }
  };

  updateUser = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(
        new APIError({
          message: "not authorized to edit user",
          status: httpStatus.UNAUTHORIZED,
        })
      );
    }

    try {
      const user = await this.userService.update(req.user.id, req.body);
      return res.send(convertUserEntity(user));
    } catch (error) {
      return next(
        new APIError({
          message: "Error in updating user",
          status: httpStatus.CONFLICT,
          stack: error ? error.stack : undefined,
        })
      );
    }
  };

  uploadImage = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(
        new APIError({
          message: "not authorized to edit user",
          status: httpStatus.UNAUTHORIZED,
        })
      );
    }

    try {
      const user = await this.userService.uploadImage(
        req.user.id,
        req.file.buffer
      );
      return res.send(user);
    } catch (error) {
      return next(
        new APIError({
          message: "Error in updating user",
          status: httpStatus.CONFLICT,
          stack: error ? error.stack : undefined,
        })
      );
    }
  };

  deleteImage = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(
        new APIError({
          message: "not authorized to edit user",
          status: httpStatus.UNAUTHORIZED,
        })
      );
    }

    try {
      const user = await this.userService.deleteImage(req.user.id);
      return res.send(user);
    } catch (error) {
      return next(
        new APIError({
          message: "Error in updating user",
          status: httpStatus.CONFLICT,
          stack: error ? error.stack : undefined,
        })
      );
    }
  };

  getShop = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(
        new APIError({
          message: "User is unauthorized",
          status: httpStatus.UNAUTHORIZED,
        })
      );
    }
    if (!req.user.shopId) {
      return next(
        new APIError({
          message: "No shop exists for this user",
          status: httpStatus.NOT_FOUND,
        })
      );
    }

    try {
      const shop = await this.userService.getUserShop(req.user.id);
      res.send(convertUserShopEntity(shop));
    } catch (error) {
      return next(
        new APIError({
          message: "Error in getting shop",
          status: httpStatus.CONFLICT,
          stack: error ? error.stack : undefined,
        })
      );
    }
  };

  addShop = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(
        new APIError({
          message: "User is unauthorized",
          status: httpStatus.UNAUTHORIZED,
        })
      );
    }

    try {
      const user = await this.userService.addShop(
        req.user.id,
        req.user.shopId,
        req.body
      );
      return res.send(user);
    } catch (error) {
      return next(
        new APIError({
          message: "Error in adding shop",
          status: httpStatus.CONFLICT,
          stack: error ? error.stack : undefined,
        })
      );
    }
  };

  updateShop = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(
        new APIError({
          message: "User is unauthorized",
          status: httpStatus.UNAUTHORIZED,
        })
      );
    }

    if (!req.user.shopId) {
      return next(
        new APIError({
          message: "No shop exists for this user",
          status: httpStatus.NOT_FOUND,
        })
      );
    }

    try {
      await this.userService.updateShop(req.user.shopId, req.body);
      res.send("Update shop successful");
    } catch (error) {
      return next(
        new APIError({
          message: "Error in updating shop",
          status: httpStatus.CONFLICT,
          stack: error ? error.stack : undefined,
        })
      );
    }
  };

  deleteShop = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(
        new APIError({
          message: "User is unauthorized",
          status: httpStatus.UNAUTHORIZED,
        })
      );
    }

    try {
      const user = await this.userService.deleteShop(req.user.id);
      return res.send(user);
    } catch (error) {
      return next(
        new APIError({
          message: "Error in deleting shop user",
          status: httpStatus.CONFLICT,
          stack: error ? error.stack : undefined,
        })
      );
    }
  };

  getAddresses = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(
        new APIError({
          message: "User is unauthorized",
          status: httpStatus.UNAUTHORIZED,
        })
      );
    }
    return res.send(await this.addressService.getAddressByUserId(req.user.id));
  };

  addAddress = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(
        new APIError({
          message: "User is unauthorized",
          status: httpStatus.UNAUTHORIZED,
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
    params.type = Address_Type.Home;
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

    const { addressId } = req.params;
    const address = await this.addressService.getById(addressId);

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
          message: "Not authorized!",
          status: httpStatus.UNAUTHORIZED,
        })
      );
    }

    return res.send(await this.addressService.update(addressId, req.body));
  };

  deleteAddress = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(
        new APIError({
          message: "User is unauthorized",
          status: httpStatus.UNAUTHORIZED,
        })
      );
    }
    const { addressId } = req.params;
    const address = await this.addressService.getById(addressId);

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
          message: "Not authorized!",
          status: httpStatus.UNAUTHORIZED,
        })
      );
    }

    return res.send(await this.addressService.delete(addressId));
  };
  validateSeller = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(
        new APIError({
          message: "User is unauthorized",
          status: httpStatus.UNAUTHORIZED,
        })
      );
    }

    try {
      const shop = await this.userService.isSeller(req.user.shopId);
      res.send(shop);
    } catch (error) {
      return next(
        new APIError({
          message: "Error in getting shop",
          status: httpStatus.CONFLICT,
          stack: error ? error.stack : undefined,
        })
      );
    }
  };

  activateShop = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(
        new APIError({
          message: "User is unauthorized",
          status: httpStatus.UNAUTHORIZED,
        })
      );
    }
    if (!req.user.shopId) {
      return next(
        new APIError({
          message: "No shop exists for this user",
          status: httpStatus.NOT_FOUND,
        })
      );
    }

    try {
      const status = await this.userService.activateShop(
        req.user.shopId,
        req.body
      );
      res.send(status);
    } catch (error) {
      return next(
        new APIError({
          message: "Error in updating shop",
          status: httpStatus.CONFLICT,
          stack: error ? error.stack : undefined,
        })
      );
    }
  };

  disableShop = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(
        new APIError({
          message: "User is unauthorized",
          status: httpStatus.UNAUTHORIZED,
        })
      );
    }
    if (!req.user.shopId) {
      return next(
        new APIError({
          message: "No shop exists for this user",
          status: httpStatus.NOT_FOUND,
        })
      );
    }

    try {
      const status = await this.userService.disableShop(
        req.user.shopId,
        req.body
      );
      res.send(status);
    } catch (error) {
      return next(
        new APIError({
          message: "Error in updating shop",
          status: httpStatus.CONFLICT,
          stack: error ? error.stack : undefined,
        })
      );
    }
  };
}
