import React, { useState, createContext } from "react";

export const AuthContext = createContext({
  auth: undefined,
  login: () => {},
  logout: () => {},
});

export function AuthProvider(props) {
  const { children } = props;
  const [auth, setAuth] = useState(undefined);
  const [userData, setUserData] = useState(undefined);
  const [nombre, setNombre] = useState(undefined);
  const [isLoggingOut, setIsLoggingOut] = useState(undefined);

  const login = (auth, userData, nombre) => {
    setAuth(auth);
    setUserData(userData);
    setNombre(nombre);
  };

  const logout = (isLoggingOut) => {
    setAuth(undefined);
    setUserData(undefined);
    setNombre(undefined);
    setIsLoggingOut(isLoggingOut);
  };

  const valueContext = {
    auth,
    userData,
    nombre,
    isLoggingOut,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
  );
}
