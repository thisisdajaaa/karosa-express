import { Model } from "objection";
export class VariationModel extends Model {
  id!: number;
  name!: string;
  price!: string;
  stock!: string;
  photo!: string;
  weight!: string;
  shelf_life!: string;
  productId!: number;

  // Table name is the only required property.
  static tableName = "variations";

  // Optional JSON schema. This is not the database schema! Nothing is generated
  // based on this. This is only used for validation. Whenever a model instance
  // is created it is checked against this schema. http://json-schema.org/.
  static jsonSchema = {
    type: "object",

    properties: {
      id: { type: "number" },
      name: { type: "string" },
      price: { type: "number" },
      stock: { type: "number" },
      photo: { type: "string" },
      weight: { type: "number" },
      shelf_life: { type: "number" },
      productId: { type: "number" },
    },
  };
}
