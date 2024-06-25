import { Model } from "objection";
import { ProvinceModel } from "./province-model";

export class CityModel extends Model {
  id!: number;
  name!: string;
  provinceId!: number;

  // Table name is the only required property.
  static tableName = "cities";

  // Optional JSON schema. This is not the database schema! Nothing is generated
  // based on this. This is only used for validation. Whenever a model instance
  // is created it is checked against this schema. http://json-schema.org/.
  static jsonSchema = {
    type: "object",

    properties: {
      id: { type: "number" },
      name: { type: "string" },
      provinceId: { type: "number" },
    },
  };

  static relationMappings = () => ({
    cities: {
      relation: Model.HasManyRelation,
      // The related model. This can be either a Model subclass constructor or an
      // absolute file path to a module that exports one.
      modelClass: ProvinceModel,
      join: {
        from: "provinces.id",
        to: "cities.provinceId",
      },
    },
  });
}
