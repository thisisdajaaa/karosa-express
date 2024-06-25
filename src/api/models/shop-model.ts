import { Model } from "objection";
import { Shop_Status } from "../constants/enums";

export class ShopModel extends Model {
  id!: string;
  name!: string;
  status!: Shop_Status | null;
  isActive!: boolean;

  // Table name is the only required property.
  static tableName = "shops";
}
