import React, { useState, createContext } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [secret, setSecret] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showDarkMode, setShowDarkMode] = useState(false);

  const value = {
    username,
    setUsername,
    secret,
    setSecret,
    isAuthenticated,
    setIsAuthenticated,
    showDarkMode,
    setShowDarkMode,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
