import { Model } from "objection";

export class PhotoModel extends Model {
  id!: string;
  publicId!: string;
  photoUrl!: string;

  // Table name is the only required property.
  static tableName = "photos";

  // Optional JSON schema. This is not the database schema! Nothing is generated
  // based on this. This is only used for validation. Whenever a model instance
  // is created it is checked against this schema. http://json-schema.org/.
  static jsonSchema = {
    type: "object",

    properties: {
      id: { type: "string" },
      publicId: { type: "string" },
      photoUrl: { type: "string" },
    },
  };
}
