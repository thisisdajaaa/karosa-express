import {
  CategoryModel,
  ProductModel,
  ShopModel,
  VariationModel,
} from "@app/models";

export interface ProductDTO {
  id: number;
  name: string;
  description: string;
  category: CategoryModel;
  variations: VariationModel[];
  shop: ShopModel;
}

export const convertProductEntity = (product: ProductModel): ProductDTO => {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    variations: product.variation,
    shop: product.shop,
  };
};
