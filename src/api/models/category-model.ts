import { Model } from "objection";

export class CategoryModel extends Model {
  id!: number;
  name!: string;
  description!: string;

  // Table name is the only required property.
  static tableName = "categories";

  // Optional JSON schema. This is not the database schema! Nothing is generated
  // based on this. This is only used for validation. Whenever a model instance
  // is created it is checked against this schema. http://json-schema.org/.
  static jsonSchema = {
    type: "object",

    properties: {
      id: { type: "number" },
      name: { type: "string" },
      description: { type: "string" },
    },
  };
}
