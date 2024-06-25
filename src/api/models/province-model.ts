import { Model } from "objection";
import { RegionModel } from "./region-model";

export class ProvinceModel extends Model {
  id!: number;
  name!: string;
  regionId!: number;

  // Table name is the only required property.
  static tableName = "provinces";

  // Optional JSON schema. This is not the database schema! Nothing is generated
  // based on this. This is only used for validation. Whenever a model instance
  // is created it is checked against this schema. http://json-schema.org/.
  static jsonSchema = {
    type: "object",

    properties: {
      id: { type: "number" },
      name: { type: "string" },
      regionId: { type: "number" },
    },
  };

  static relationMappings = () => ({
    provinces: {
      relation: Model.HasManyRelation,
      // The related model. This can be either a Model subclass constructor or an
      // absolute file path to a module that exports one.
      modelClass: RegionModel,
      join: {
        from: "regions.id",
        to: "provinces.regionId",
      },
    },
  });
}
