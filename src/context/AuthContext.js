import React, { useState, createContext, useEffect, useLayoutEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
  auth: undefined,
  isLoggingOut: undefined,
  nombre: undefined,
  userData: undefined,
  JWTtoken: undefined,
  token: undefined,
  login: () => {},
  logout: () => {},
});

export function AuthProvider(props) {
  const { children, expoPushToken } = props;
  const [auth, setAuth] = useState(undefined);
  const [userData, setUserData] = useState(undefined);
  const [nombre, setNombre] = useState(undefined);
  const [JWTtoken, setJWTtoken] = useState(undefined);
  const [isLoggingOut, setIsLoggingOut] = useState(undefined);
  const [token, setToken] = useState(undefined);
  

  const removeItemValue = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
        return true;
    }
    catch(exception) {
        return false;
    }
}

  useEffect(() => {
    setToken(expoPushToken);
  }, [expoPushToken]);

  const login = (auth, userData, nombre, JWTtoken) => {
    setAuth(auth);
    setUserData(userData);
    setNombre(nombre);
    setJWTtoken(JWTtoken);
  };

  const logout = (isLoggingOut) => {
    setAuth(undefined);
    setUserData(undefined);
    setNombre(undefined);
    setJWTtoken(undefined);
    setIsLoggingOut(isLoggingOut);

    removeItemValue('@authData');

  };

  const valueContext = {
    auth,
    userData,
    nombre,
    JWTtoken,
    isLoggingOut,
    token,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
  );
}
