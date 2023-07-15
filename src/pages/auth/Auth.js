import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    const storedLoggedInUser = localStorage.getItem('loggedInUser');
    if (storedLoggedInUser) {
      setLoggedIn(storedLoggedInUser);
    }
  }, []);

  const login = (username) => {
    setLoggedIn(username);
    localStorage.setItem('loggedInUser', username);
  };

  const logout = () => {
    setLoggedIn(null);
    localStorage.removeItem('loggedInUser');
  };

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};