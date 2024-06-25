import { ReviewModel } from "@app/models";
import { IReviewRepository } from "@app/repositories";

class ReviewService implements IReviewRepository {
  async create(review: ReviewModel): Promise<ReviewModel> {
    const query = await ReviewModel.query().insert(review);
    return query;
  }
  async get(): Promise<ReviewModel[]> {
    const query = await ReviewModel.query();
    return query;
  }
  async getById(id: string): Promise<ReviewModel> {
    const query = await ReviewModel.query().findById(id);
    return query;
  }
  async update(id: string, t: ReviewModel): Promise<ReviewModel> {
    const query = await ReviewModel.query().patchAndFetchById(id, t);
    return query;
  }
  async delete(id: string): Promise<boolean> {
    const query = await ReviewModel.query().deleteById(id);
    return !!query;
  }
  async getReviewsByProductId(productId: number): Promise<ReviewModel[]> {
    const query = await ReviewModel.query().where("productId", productId);
    return query;
  }
}

export default ReviewService;
