import { Model } from "objection";
import { CategoryModel } from "./category-model";
import { ReviewModel } from "./review-model";
import { ShopModel } from "./shop-model";
import { VariationModel } from "./variation-model";

export class ProductModel extends Model {
  id!: number;
  name!: string;
  description!: string;
  categoryId!: number;
  category!: CategoryModel;
  variationId!: number;
  variation!: VariationModel[];
  review!: ReviewModel[];
  shopId!: number;
  shop!: ShopModel;

  // Table name is the only required property.
  static tableName = "products";

  // Optional JSON schema. This is not the database schema! Nothing is generated
  // based on this. This is only used for validation. Whenever a model instance
  // is created it is checked against this schema. http://json-schema.org/.
  static jsonSchema = {
    type: "object",

    properties: {
      id: { type: "number" },
      name: { type: "string" },
      description: { type: "string" },
      categoryId: { type: "number" },
      shopId: { type: "number" },
    },
  };

  static relationMappings = () => ({
    category: {
      relation: Model.BelongsToOneRelation,
      // The related model. This can be either a Model subclass constructor or an
      // absolute file path to a module that exports one.
      modelClass: CategoryModel,
      join: {
        from: "products.categoryId",
        to: "categories.id",
      },
    },
    variation: {
      relation: Model.HasManyRelation,
      // The related model. This can be either a Model subclass constructor or an
      // absolute file path to a module that exports one.
      modelClass: VariationModel,
      join: {
        from: "products.id",
        to: "variations.productId",
      },
    },
    shop: {
      relation: Model.BelongsToOneRelation,
      // The related model. This can be either a Model subclass constructor or an
      // absolute file path to a module that exports one.
      modelClass: ShopModel,
      join: {
        from: "products.shopId",
        to: "shops.id",
      },
    },
  });
}
