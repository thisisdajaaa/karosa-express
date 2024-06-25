import { Model } from "objection";
import { Gender } from "../constants/enums";
import { PhotoModel } from "./photo-model";
import { ShopModel } from "./shop-model";

export class UserModel extends Model {
  hash!: string;
  salt!: string;
  id!: string;
  fullName!: string;
  username!: string;
  photoId!: number;
  phoneNo!: string;
  gender!: Gender | null;
  email!: string;
  photo!: PhotoModel;
  shopId!: number;
  shop!: ShopModel;

  // Table name is the only required property.
  static tableName = "users";

  // Optional JSON schema. This is not the database schema! Nothing is generated
  // based on this. This is only used for validation. Whenever a model instance
  // is created it is checked against this schema. http://json-schema.org/.
  static jsonSchema = {
    type: "object",

    properties: {
      id: { type: "string" },
      username: { type: "string", minLength: 6, maxLength: 255 },
      firstName: { type: "string", minLength: 1, maxLength: 255 },
      middleName: { type: "string", minLength: 1, maxLength: 255 },
      lastName: { type: "string", minLength: 1, maxLength: 255 },
      bio: { type: "string", minLength: 1, maxLength: 255 },
      gender: { type: "string" },
      email: { type: "string" },
      photoId: { type: "number" },
      shopId: { type: "number" },
    },
  };

  static relationMappings = () => ({
    photo: {
      relation: Model.BelongsToOneRelation,
      // The related model. This can be either a Model subclass constructor or an
      // absolute file path to a module that exports one.
      modelClass: PhotoModel,
      join: {
        from: "users.photoId",
        to: "photos.id",
      },
    },
    shop: {
      relation: Model.BelongsToOneRelation,
      modelClass: ShopModel,
      join: {
        from: "users.shopId",
        to: "shops.id",
      },
    },
  });
}
