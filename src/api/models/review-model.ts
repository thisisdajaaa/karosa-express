import { Model } from "objection";

export class ReviewModel extends Model {
  id!: number;
  productId!: number;
  comment!: string;
  rating!: number;
  reviewerId!: string;
  revieweeId!: string;

  // Table name is the only required property.
  static tableName = "reviews";

  // Optional JSON schema. This is not the database schema! Nothing is generated
  // based on this. This is only used for validation. Whenever a model instance
  // is created it is checked against this schema. http://json-schema.org/.
  static jsonSchema = {
    type: "object",

    properties: {
      id: { type: "number" },
      productId: { type: "number" },
      comment: { type: "string" },
      rating: { type: "number" },
      reviewerId: { type: "string" },
      revieweeId: { type: "string" },
    },
  };
}
