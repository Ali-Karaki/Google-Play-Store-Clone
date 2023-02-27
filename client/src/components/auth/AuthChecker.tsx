import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LOCAL_STORAGE } from "../../models/localstorage.model";

interface Props {
  children: React.ReactNode;
}

const AuthCheck = ({ children }: Props) => {
  const authToken = localStorage.getItem(LOCAL_STORAGE.FIREBASE_AUTH_TOKEN);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) {
      navigate("/login");
    }
  }, []);

  if (!authToken) return null;

  return <>{children}</>;
};

export default AuthCheck;
