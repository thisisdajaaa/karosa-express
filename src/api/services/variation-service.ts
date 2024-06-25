import { VariationModel } from "@app/models";
import { IVariationRepository } from "../repositories/IVariationRepository";
class VariationService implements IVariationRepository {
  async create(variation: VariationModel): Promise<VariationModel> {
    const query = await VariationModel.query().insert(variation);
    return query;
  }
  async get(): Promise<VariationModel[]> {
    const query = await VariationModel.query();
    return query;
  }
  async getById(id: string): Promise<VariationModel> {
    const query = await VariationModel.query().findById(id);
    return query;
  }
  async update(id: string, t: VariationModel): Promise<VariationModel> {
    const query = await VariationModel.query().patchAndFetchById(id, t);
    return query;
  }
  async delete(id: string): Promise<boolean> {
    const query = await VariationModel.query().deleteById(id);
    return !!query;
  }
  async getVariationsByProductID(id: number): Promise<VariationModel[]> {
    const query = await VariationModel.query().where("productId", id);
    return query;
  }
}

export default VariationService;
