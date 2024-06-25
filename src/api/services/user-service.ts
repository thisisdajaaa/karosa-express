import { IUserRepository } from "@app/repositories";
import { UserModel, PhotoModel, ShopModel } from "@app/models";
import { deleteFile, uploadFile } from "@app/utils";
import { v4 as uuidv4 } from "uuid";

class UserService implements IUserRepository {
  async uploadImage(id: string, buffer: Buffer): Promise<boolean> {
    // if the existing user already has a photo. just update the cloud, if not insert a new one
    const photo: PhotoModel = (await UserModel.relatedQuery("photo")
      .for(id)
      .first()) as PhotoModel;
    if (photo) {
      await deleteFile(photo.publicId);
      await uploadFile(buffer, "avatars", photo.publicId);
      return true;
    } else {
      const result = await uploadFile(buffer, "avatars", uuidv4());
      const form = new PhotoModel();
      form.photoUrl = result["url"];
      form.publicId = result["public_id"];
      await UserModel.relatedQuery("photo").for(id).insert(form);
      return true;
    }
  }

  async deleteImage(id: string): Promise<boolean> {
    const photo: PhotoModel = (await UserModel.relatedQuery("photo")
      .for(id)
      .first()) as PhotoModel;
    if (photo) {
      await deleteFile(photo.publicId);
      await UserModel.relatedQuery("photo").for(id).delete();
      return true;
    }
    return false;
  }

  async isUserNameExists(username: string): Promise<boolean> {
    const u = await UserModel.query().findOne("username", username);

    // if username exists return true
    if (u) {
      return true;
    }

    return false;
  }
  async getUserByIdentifier(identifier: string): Promise<UserModel> {
    // eslint-disable-next-line no-useless-catch
    const user = UserModel.query()
      .findOne("email", identifier)
      .orWhere("phoneNo", identifier)
      .orWhere("username", identifier);
    user.debug();

    return await user;
  }

  async create(user: UserModel): Promise<UserModel> {
    const query = await UserModel.query().insert(user);

    return query;
  }
  async get(): Promise<UserModel[]> {
    const query = await UserModel.query();
    return query;
  }
  async getById(id: string): Promise<UserModel> {
    const query = await UserModel.query()
      .findById(id)
      .withGraphFetched("photo")
      .withGraphFetched("shop");
    return query;
  }
  async update(id: string, t: UserModel): Promise<UserModel> {
    const query = await UserModel.query().patchAndFetchById(id, t);
    return query;
  }
  async delete(id: string): Promise<boolean> {
    const query = await UserModel.query().deleteById(id);
    return !!query;
  }

  async getUserShop(id: string): Promise<UserModel> {
    const shop = await UserModel.query().findById(id).withGraphFetched("shop");
    return shop;
  }

  async addShop(userId: string, shopId: number, t: ShopModel): Promise<string> {
    if (!shopId) {
      const params: ShopModel = new ShopModel();
      params.isActive = t.isActive;
      const shop = await UserModel.relatedQuery("shop")
        .for(shopId)
        .insert(params);
      const userShopId: UserModel = new UserModel();
      userShopId.shopId = parseInt(shop.id);
      await UserModel.query().patchAndFetchById(userId, userShopId);
      return "Your Shop is successfully created.";
    }
    return "Shop already exists";
  }

  async updateShop(id: number, t: ShopModel): Promise<boolean> {
    const shopId: ShopModel = new ShopModel();
    shopId.name = t.name;
    shopId.status = t.status;
    await ShopModel.query().patchAndFetchById(id, shopId);
    return true;
  }

  async deleteShop(id: string): Promise<boolean> {
    const shop: ShopModel = (await UserModel.relatedQuery("shop")
      .for(id)
      .first()) as ShopModel;
    if (shop) {
      await UserModel.relatedQuery("shop").for(id).delete();
      return true;
    }
    return false;
  }

  async getByShopId(shopId: number): Promise<UserModel> {
    const user = UserModel.query().findOne("shopId", shopId);
    return user;
  }

  async activateShop(id: number, t: ShopModel): Promise<string> {
    const shopId: ShopModel = new ShopModel();
    shopId.isActive = t.isActive;
    await ShopModel.query().patchAndFetchById(id, shopId);
    return "Shop is now active";
  }

  async disableShop(id: number, t: ShopModel): Promise<string> {
    const shopId: ShopModel = new ShopModel();
    shopId.isActive = t.isActive;
    await ShopModel.query().patchAndFetchById(id, shopId);
    return "Shop is now inactive";
  }

  async isSeller(id: number): Promise<boolean> {
    if (id) {
      return true;
    }
    return false;
  }
}

export default UserService;
