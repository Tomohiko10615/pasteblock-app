import React, { useState, createContext } from "react";

export const LoadingContext = createContext({
  isLoading: false,
  loading: () => {},
});

export function LoadingProvider(props) {
  const { children } = props;
  const [isLoading, setIsLoading] = useState(undefined);

  const loading = (loading) => {
    setIsLoading(loading);
  };

  const valueContext = {
    isLoading,
    loading,
  };

  return (
    <LoadingContext.Provider value={valueContext}>
      {children}
    </LoadingContext.Provider>
  );
}
