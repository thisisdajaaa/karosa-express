import { Model } from "objection";
import { CityModel } from "./city-model";

export class BarangayModel extends Model {
  id!: number;
  name!: string;
  cityId!: number;

  // Table name is the only required property.
  static tableName = "barangays";

  // Optional JSON schema. This is not the database schema! Nothing is generated
  // based on this. This is only used for validation. Whenever a model instance
  // is created it is checked against this schema. http://json-schema.org/.
  static jsonSchema = {
    type: "object",

    properties: {
      id: { type: "number" },
      name: { type: "string" },
      cityId: { type: "number" },
    },
  };

  static relationMappings = () => ({
    cities: {
      relation: Model.HasManyRelation,
      // The related model. This can be either a Model subclass constructor or an
      // absolute file path to a module that exports one.
      modelClass: CityModel,
      join: {
        from: "cities.id",
        to: "barangays.cityId",
      },
    },
  });
}
