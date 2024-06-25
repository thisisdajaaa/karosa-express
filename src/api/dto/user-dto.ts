import { Gender } from "@app/constants";
import { UserModel, ShopModel } from "@app/models";
import { PhotoDTO } from "./photo-dto";

// Response

export interface UserDTO {
  username: string;
  fullName: string;
  phoneNo: string;
  gender: Gender | null;
  email: string;
  avatar: PhotoDTO | null;
  shop: ShopModel;
}

export const convertUserEntity = (user: UserModel): UserDTO => {
  return {
    username: user.username,
    fullName: user.fullName,
    phoneNo: user.phoneNo,
    gender: user.gender,
    email: user.email,
    avatar: {
      photoUrl: user.photo?.photoUrl,
      publicId: user.photo?.publicId,
    },
    shop: user.shop,
  };
};

export interface UserShopDTO {
  username: string;
  email: string;
  shop: ShopModel;
}

export const convertUserShopEntity = (user: UserModel): UserShopDTO => {
  return {
    username: user.username,
    email: user.email,
    shop: user.shop,
  };
};
