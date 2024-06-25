import { IRepository } from "./IRepository";
import { UserModel } from "@app/models";
import { Model } from "objection";

export interface IUserRepository extends IRepository<UserModel> {
  getUserByIdentifier(identifier: string): Promise<UserModel>;
  isUserNameExists(username: string): Promise<boolean>;
  uploadImage(id: string, buffer: Buffer): Promise<boolean>;
  deleteImage(id: string): Promise<boolean>;
  //shop
  getUserShop(id: string): Promise<UserModel>;
  addShop(userId: string, shopId: number, t: Model): Promise<string>;
  updateShop(id: number, t: Model): Promise<boolean>;
  deleteShop(id: string): Promise<boolean>;
  getByShopId(shopId: number): Promise<UserModel>;
  activateShop(id: number, t: Model): Promise<string>;
  disableShop(id: number, t: Model): Promise<string>;
  //verification if a user is a seller
  isSeller(id: number): Promise<boolean>;
}
