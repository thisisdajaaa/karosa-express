import { Model } from "objection";
import { ProvinceModel } from "./province-model";

export class RegionModel extends Model {
  id!: number;
  name!: string;
  provinces!: ProvinceModel[];

  // Table name is the only required property.
  static tableName = "regions";

  // Optional JSON schema. This is not the database schema! Nothing is generated
  // based on this. This is only used for validation. Whenever a model instance
  // is created it is checked against this schema. http://json-schema.org/.
  static jsonSchema = {
    type: "object",

    properties: {
      id: { type: "number" },
      name: { type: "string" },
    },
  };

  static relationMappings = () => ({
    provinces: {
      relation: Model.HasManyRelation,
      // The related model. This can be either a Model subclass constructor or an
      // absolute file path to a module that exports one.
      modelClass: ProvinceModel,
      join: {
        from: "regions.id",
        to: "provinces.regionId",
      },
    },
  });
}
