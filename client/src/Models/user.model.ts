export interface WishlistItem {
  _id: string;
  name: string;
  category: string;
  stars: number;
  logo: string;
}

export interface UserModel {
  _id: string;
  name: string;
  email: string;
  rememberMe: boolean;
  wishlist: WishlistItem[];
  isAdmin: boolean;
}

export interface UserResponse {
  message: UserModel;
  success: boolean
}
