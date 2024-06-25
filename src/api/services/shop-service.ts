import { ShopModel } from "@app/models";
import { IShopRepository } from "@app/repositories";

class ShopService implements IShopRepository {
  async getById(id: string): Promise<ShopModel> {
    const query = await ShopModel.query().findById(id);
    return query;
  }
  async get(): Promise<ShopModel[]> {
    const query = await ShopModel.query();
    return query;
  }
}

export default ShopService;
