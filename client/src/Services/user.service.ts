import axios from "axios";
import { environment } from "../config/environment";
import { LOCAL_STORAGE } from "../models/localstorage.model";
import { UserModel } from "../models/user.model";

async function createUser(
  name: string,
  email: string,
  rememberMe: boolean
): Promise<UserModel> {
  const authToken = localStorage.getItem(LOCAL_STORAGE.FIREBASE_AUTH_TOKEN);
  const headers = { Authorization: `Bearer ${authToken}` };

  const data = { name, email, rememberMe };

  const res = await axios.post(`${environment.webApi}users/createUser`, data, {
    headers: headers,
  });
  return res.data.message;
}

async function getUser(email?: string): Promise<UserModel> {
  const userId = localStorage.getItem(LOCAL_STORAGE.USER_ID);
  const data = typeof email === "undefined" ? { userId } : { email };
  const res = await axios.post(`${environment.webApi}users/getUser`, data, {});
  return res.data.message;
}

const UserServices = { createUser, getUser };
export default UserServices;
