import { IRepository } from "./IRepository";
import { ProductModel } from "@app/models";
import { IExists } from "./ICrud";

export interface IProductRepository extends IRepository<ProductModel>, IExists {
  getProducts(param: string): Promise<ProductModel[]>;
}
