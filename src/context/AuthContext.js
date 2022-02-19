import React, { useState, createContext, useEffect, useLayoutEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
  auth: undefined,
  isLoggingOut: undefined,
  nombre: undefined,
  userData: undefined,
  context: undefined,
  token: undefined,
  login: () => {},
  logout: () => {},
});

export function AuthProvider(props) {
  const { children, expoPushToken } = props;
  const [auth, setAuth] = useState(undefined);
  const [userData, setUserData] = useState(undefined);
  const [nombre, setNombre] = useState(undefined);
  const [context, setContext] = useState(undefined);
  const [isLoggingOut, setIsLoggingOut] = useState(undefined);
  const [token, setToken] = useState(undefined);
  

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@authData')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  }

  useLayoutEffect(() => {
    (async () => {
      const result = await getData();
      login(result.success, result.email, result.nombre, result.context);
    })();
  }, []);

  useEffect(() => {
    setToken(expoPushToken);
  }, [expoPushToken]);

  const login = (auth, userData, nombre, context) => {
    setAuth(auth);
    setUserData(userData);
    setNombre(nombre);
    setContext(context);
  };

  const logout = (isLoggingOut) => {
    setAuth(undefined);
    setUserData(undefined);
    setNombre(undefined);
    setContext(undefined);
    setIsLoggingOut(isLoggingOut);
  };

  const valueContext = {
    auth,
    userData,
    nombre,
    context,
    isLoggingOut,
    token,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
  );
}
