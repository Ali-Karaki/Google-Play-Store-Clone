import { getAuth } from "firebase/auth";
import { LOCAL_STORAGE } from "../models/localstorage.model";
import jwt_decode from "jwt-decode";
import UserServices from "./user.service";
import { environment } from "../config/environment";

const auth = getAuth();

const refreshToken = async () => {
  const token = await auth.currentUser?.getIdToken(true);
  if (token) {
    localStorage.setItem(LOCAL_STORAGE.FIREBASE_AUTH_TOKEN, token);
  }
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
  const rememberMe: boolean = (await UserServices.getUser()).rememberMe;
  const loginPage = `${environment.devHost}/login`;

  // if token expired
  if (expirationTime < now) {
    if (rememberMe) {
      refreshToken();
    } else {
      // redirect to login
      localStorage.removeItem(LOCAL_STORAGE.FIREBASE_AUTH_TOKEN);
      if (window.location.pathname !== "/login") {
        window.location.replace(loginPage);
      }
    }
    // else set timer to timeLeft so refresh
  } else {
    setRefreshTimer(timeLeft);
  }
};
