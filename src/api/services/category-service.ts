import { CategoryModel } from "@app/models";
import { ICategoryRepository } from "@app/repositories";

class CategoryService implements ICategoryRepository {
  async get(): Promise<CategoryModel[]> {
    const query = await CategoryModel.query();
    return query;
  }
  async getById(id: string): Promise<CategoryModel> {
    const query = await CategoryModel.query().findById(id);
    return query;
  }
}

export default CategoryService;
