import React, { createContext, useContext, useEffect, useState } from "react";

import api from "../api";

const AuthContext = createContext({
  isAuthenticated: false,
  isLoading: true,
  user: null,
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const storeSession = (token, nextUser) => {
    localStorage.setItem("zenvest_token", token);
    localStorage.setItem("zenvest_user", JSON.stringify(nextUser));
    setUser(nextUser);
  };

  const clearSession = () => {
    localStorage.removeItem("zenvest_token");
    localStorage.removeItem("zenvest_user");
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("zenvest_token");

    if (!token) {
      setIsLoading(false);
      return;
    }

    api
      .get("/auth/me")
      .then((res) => setUser(res.data.user))
      .catch(() => clearSession())
      .finally(() => setIsLoading(false));
  }, []);

  const login = async (username, password) => {
    const res = await api.post("/auth/login", { username, password });
    storeSession(res.data.token, res.data.user);
  };

  const signup = async (username, password) => {
    const res = await api.post("/auth/signup", { username, password });
    storeSession(res.data.token, res.data.user);
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      // Clear local auth even if the backend session is already gone.
    } finally {
      clearSession();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: Boolean(user),
        isLoading,
        user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
