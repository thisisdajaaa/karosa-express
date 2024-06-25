export interface ReviewDTO {
  id: number;
  productId: number;
  comment: string;
  rating: number;
  reviewerId: string;
  revieweeId: string;
}
