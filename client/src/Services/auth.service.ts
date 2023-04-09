import { getAuth } from "firebase/auth";
import { LOCAL_STORAGE } from "../models/localstorage.model";
import jwt_decode from "jwt-decode";
import UserServices from "./user.service";
import { environment } from "../config/environment";

const auth = getAuth();

const loginPage = `${environment.devHost}/login`;

const refreshToken = async () => {
  const token = await auth.currentUser?.getIdToken(true);
  if (token) {
    localStorage.setItem(LOCAL_STORAGE.FIREBASE_AUTH_TOKEN, token);
  }
};

const signOut = async () => {
  localStorage.removeItem(LOCAL_STORAGE.FIREBASE_AUTH_TOKEN);
  await auth.signOut();
  localStorage.clear();
  sessionStorage.clear();
  window.location.href = loginPage;
};

export const setRefreshTimer = (time: any) => {
  setTimeout(async () => {
    await refreshToken();
  }, time);
};

export const checkTokenExpiration = async () => {
  const token = localStorage.getItem(LOCAL_STORAGE.FIREBASE_AUTH_TOKEN)!;

  const decodedToken: any = jwt_decode(token);
  const expirationTime = decodedToken.exp * 1000;
  const now = Date.now();
  const timeLeft = expirationTime - now;
  const rememberMe: boolean = (await UserServices.getUser()).message.rememberMe;

  // if token expired
  if (expirationTime < now) {
    if (rememberMe) {
      await refreshToken();
    } else {
      signOut();
    }
    // else set timer to timeLeft so refresh
  } else {
    setRefreshTimer(timeLeft);
  }
};
