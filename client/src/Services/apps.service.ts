import axios from "axios";
import { environment } from "../config/environment";
import { LOCAL_STORAGE } from "../models/localstorage.model";
import { AppModel } from "../models/apps.model";

async function getApps(): Promise<AppModel[]> {
  const authToken = localStorage.getItem(LOCAL_STORAGE.FIREBASE_AUTH_TOKEN);
  const headers = { Authorization: `Bearer ${authToken}` };

  const res = await axios.get(`${environment.webApi}apps/getApps`, {
    headers: headers,
  });
  
  return res.data.message;
}

async function getGames(): Promise<AppModel[]> {
  const authToken = localStorage.getItem(LOCAL_STORAGE.FIREBASE_AUTH_TOKEN);
  const headers = { Authorization: `Bearer ${authToken}` };

  const res = await axios.get(`${environment.webApi}apps/getGames`, {
    headers: headers,
  });
  return res.data.message;
}

const AppsServices = { getApps, getGames };
export default AppsServices;
