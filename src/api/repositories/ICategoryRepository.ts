import { CategoryModel } from "@app/models";
import { IRead } from "./ICrud";

export type ICategoryRepository = IRead<CategoryModel>;
