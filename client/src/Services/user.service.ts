import axios from "axios";
import { environment } from "../Config/environment";
import { LOCAL_STORAGE } from "../Models/localstorage.model";
import { UserModel } from "../Models/user.model";

async function createUser(email: string): Promise<{
  message: UserModel;
  success: boolean;
}> {
  const authToken = localStorage.getItem(LOCAL_STORAGE.AUTH_TOKEN);
  const data = { email };
  const headers = { Authorization: `Bearer ${authToken}` };
  const res = await axios.post(`${environment.webApi}users/createUser`, data, {
    headers: headers,
  });
  return res.data;
}

async function getUsers(): Promise<{
  message: UserModel[];
  success: boolean;
}> {
  const authToken = localStorage.getItem(LOCAL_STORAGE.AUTH_TOKEN);
  const headers = { Authorization: `Bearer ${authToken}` };
  const res = await axios.get(`${environment.webApi}users/getUsers`, {
    headers: headers,
  });
  return res.data;
}

const UserServices = { createUser, getUsers };
export default UserServices;
