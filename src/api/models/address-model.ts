import { Model } from "objection";
import { Address_Type } from "../constants/enums";

export class AddressModel extends Model {
  id!: string;
  type!: Address_Type | null;
  name!: string;
  phoneNo!: string;
  // postalCode!: string;
  detailed_address!: string;
  isDefaultAddress!: boolean;
  // address_line_2!: string | null;
  barangayId!: number;
  userId!: string;

  // Table name is the only required property.
  static tableName = "addresses";

  // Optional JSON schema. This is not the database schema! Nothing is generated
  // based on this. This is only used for validation. Whenever a model instance
  // is created it is checked against this schema. http://json-schema.org/.
  static jsonSchema = {
    type: "object",

    properties: {
      id: { type: "string" },
      name: { type: "string" },
      type: { type: "string" },
      phoneNo: { type: "string" },
      detailed_address: { type: "string" },
      isDefaultAddress: { type: "boolean" },
      barangayId: { type: "number" },
      userId: { type: "string" },
    },
  };
}
