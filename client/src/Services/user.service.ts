import axios from "axios";
import { environment } from "../config/environment";
import { LOCAL_STORAGE } from "../models/localstorage.model";
import { UserResponse, WishlistItem } from "../models/user.model";
import { ResponseI } from "../models/response.model";

async function createUser(
  name: string,
  email: string,
  rememberMe: boolean
): Promise<UserResponse> {
  const authToken = localStorage.getItem(LOCAL_STORAGE.FIREBASE_AUTH_TOKEN);
  const headers = { Authorization: `Bearer ${authToken}` };
  const data = { name, email, rememberMe };
  const res = await axios.post(`${environment.devAPI}/users/createUser`, data, {
    headers: headers,
  });
  return res.data;
}

async function getUser(email?: string): Promise<UserResponse> {
  const userId = localStorage.getItem(LOCAL_STORAGE.USER_ID);
  const data = typeof email === "undefined" ? { userId } : { email };
  const res = await axios.post(`${environment.devAPI}/users/getUser`, data, {});
  return res.data;
}

async function getWishList(): Promise<WishlistItem[]> {
  const userId = localStorage.getItem(LOCAL_STORAGE.USER_ID);
  const authToken = localStorage.getItem(LOCAL_STORAGE.FIREBASE_AUTH_TOKEN);
  const headers = { Authorization: `Bearer ${authToken}` };

  const res = await axios.post(
    `${environment.devAPI}/users/getWishList`,
    { userId },
    {
      headers: headers,
    }
  );
  return res.data.message;
}

async function removeFromWishList(itemId: string): Promise<ResponseI> {
  const userId = localStorage.getItem(LOCAL_STORAGE.USER_ID);
  const authToken = localStorage.getItem(LOCAL_STORAGE.FIREBASE_AUTH_TOKEN);
  const headers = { Authorization: `Bearer ${authToken}` };
  const res = await axios.post(
    `${environment.devAPI}/users/removeFromWishList`,
    { itemId, userId },
    {
      headers: headers,
    }
  );
  return res.data;
}

async function addToWishList(item: WishlistItem): Promise<ResponseI> {
  const userId = localStorage.getItem(LOCAL_STORAGE.USER_ID);
  const authToken = localStorage.getItem(LOCAL_STORAGE.FIREBASE_AUTH_TOKEN);
  const headers = { Authorization: `Bearer ${authToken}` };
  const res = await axios.post(
    `${environment.devAPI}/users/addToWishList`,
    { item, userId },
    {
      headers: headers,
    }
  );
  return res.data;
}

const UserServices = {
  createUser,
  getUser,
  getWishList,
  removeFromWishList,
  addToWishList,
};
export default UserServices;
