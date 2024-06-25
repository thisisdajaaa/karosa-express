import { IRepository } from "./IRepository";
import { ReviewModel } from "@app/models";

export interface IReviewRepository extends IRepository<ReviewModel> {
  getReviewsByProductId(productId: number): Promise<ReviewModel[]>;
}
