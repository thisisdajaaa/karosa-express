import { AddressModel } from "@app/models";
import { IAddressRepository } from "@app/repositories";

class AddressService implements IAddressRepository {
  async create(address: AddressModel): Promise<AddressModel> {
    if (address.isDefaultAddress) {
      await AddressModel.query()
        .patch({ isDefaultAddress: false })
        .where("isDefaultAddress", true)
        .andWhere("userId", address.userId);
    }
    const query = await AddressModel.query().insert(address);
    return query;
  }
  async get(): Promise<AddressModel[]> {
    const query = await AddressModel.query();
    return query;
  }
  async getById(id: string): Promise<AddressModel> {
    const query = await AddressModel.query().findById(id);
    return query;
  }
  async update(id: string, t: AddressModel): Promise<AddressModel> {
    const query = await AddressModel.query().patchAndFetchById(id, t);
    return query;
  }
  async delete(id: string): Promise<boolean> {
    const query = await AddressModel.query().deleteById(id);
    return !!query;
  }
  async getAddressByUserId(userId: string): Promise<AddressModel[]> {
    const query = await AddressModel.query().where("userId", userId);
    return query;
  }
  async getShopAddressByUserId(userId: string): Promise<AddressModel> {
    const query = await AddressModel.query()
      .findOne("userId", userId)
      .andWhere("type", "shop");
    return query;
  }
}

export default AddressService;
