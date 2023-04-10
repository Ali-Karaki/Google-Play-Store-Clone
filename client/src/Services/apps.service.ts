import axios from "axios";
import { environment } from "../config/environment";
import { LOCAL_STORAGE } from "../models/localstorage.model";
import { AppModel } from "../models/apps.model";
import { ResponseI } from "../models/response.model";

async function getApps(): Promise<AppModel[]> {
  const authToken = localStorage.getItem(LOCAL_STORAGE.FIREBASE_AUTH_TOKEN);
  const headers = { Authorization: `Bearer ${authToken}` };

  const res = await axios.get(`${environment.devAPI}/apps/getApps`, {
    headers: headers,
  });

  return res.data.message;
}

async function getGames(): Promise<AppModel[]> {
  const authToken = localStorage.getItem(LOCAL_STORAGE.FIREBASE_AUTH_TOKEN);
  const headers = { Authorization: `Bearer ${authToken}` };

  const res = await axios.get(`${environment.devAPI}/apps/getGames`, {
    headers: headers,
  });
  return res.data.message;
}

async function createApp(app: AppModel): Promise<ResponseI> {
  const authToken = localStorage.getItem(LOCAL_STORAGE.FIREBASE_AUTH_TOKEN);
  const headers = { Authorization: `Bearer ${authToken}` };
  const res = await axios.post(`${environment.devAPI}/apps/createApp`, app, {
    headers: headers,
  });
  return res.data;
}

async function editApp(app: AppModel): Promise<ResponseI> {
  const authToken = localStorage.getItem(LOCAL_STORAGE.FIREBASE_AUTH_TOKEN);
  const headers = { Authorization: `Bearer ${authToken}` };
  const res = await axios.put(`${environment.devAPI}/apps/editApp`, app, {
    headers: headers,
  });
  return res.data;
}

async function deleteApp(appId: string): Promise<ResponseI> {
  const authToken = localStorage.getItem(LOCAL_STORAGE.FIREBASE_AUTH_TOKEN);
  const headers = { Authorization: `Bearer ${authToken}` };
  const data = { appId };
  const res = await axios.post(`${environment.devAPI}/apps/deleteApp`, data, {
    headers: headers,
  });
  return res.data;
}

const AppsServices = { getApps, getGames, createApp, editApp, deleteApp };
export default AppsServices;
