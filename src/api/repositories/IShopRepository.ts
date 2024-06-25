import { ShopModel } from "@app/models";
import { IRead } from "./ICrud";

export type IShopRepository = IRead<ShopModel>;
