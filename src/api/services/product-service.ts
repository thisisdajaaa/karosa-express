import { ProductModel } from "@app/models";
import { IProductRepository } from "@app/repositories";

class ProductService implements IProductRepository {
  async exists(id: string): Promise<boolean> {
    const query = await ProductModel.query().select("id").findById(id);
    return !!query;
  }

  async create(productDetails: ProductModel): Promise<ProductModel> {
    const query = await ProductModel.query().insert(productDetails);
    return query;
  }
  async get(): Promise<ProductModel[]> {
    const query = await ProductModel.query()
      .withGraphFetched("category")
      .withGraphFetched("variation")
      .withGraphFetched("shop");
    return query;
  }
  async getById(id: string): Promise<ProductModel> {
    const query = await ProductModel.query()
      .findById(id)
      .withGraphFetched("category")
      .withGraphFetched("variation")
      .withGraphFetched("shop");
    return query;
  }
  async update(
    id: string,
    productDetails: ProductModel
  ): Promise<ProductModel> {
    const query = await ProductModel.query().patchAndFetchById(
      id,
      productDetails
    );
    return query;
  }
  async delete(id: string): Promise<boolean> {
    const query = await ProductModel.query().deleteById(id);
    return !!query;
  }
  async getProducts(param: string): Promise<ProductModel[]> {
    const query = ProductModel.query()
      .withGraphFetched("category")
      .withGraphFetched("variation")
      .withGraphFetched("shop")
      .whereRaw("LOWER(name) LIKE ?", "%" + param.toLowerCase() + "%");
    query.debug();

    return await query;
  }
}

export default ProductService;
