import axios from "axios";
import { environment } from "../config/environment";
import { LOCAL_STORAGE } from "../models/localstorage.model";
import { UserModel } from "../models/user.model";

async function createUser(email: string): Promise<UserModel> {
  const authToken = localStorage.getItem(LOCAL_STORAGE.FIREBASE_AUTH_TOKEN);
  const headers = { Authorization: `Bearer ${authToken}` };

  const data = { email };

  const res = await axios.post(`${environment.webApi}users/createUser`, data, {
    headers: headers,
  });
  return res.data.message;
}

const UserServices = { createUser };
export default UserServices;
