import { IRepository } from "./IRepository";
import { VariationModel } from "@app/models";

export interface IVariationRepository extends IRepository<VariationModel> {
  getVariationsByProductID(productId: number): Promise<VariationModel[]>;
}
