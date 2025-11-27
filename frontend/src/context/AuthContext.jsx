import React, { createContext, useState, useEffect } from "react";
import { login as apiLogin } from "../services/authServices";
import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (!token) {
      setLoadingAuth(false);
      return;
    }

    const loadUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
      } catch {
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
      } finally {
        setLoadingAuth(false);
      }
    };

    loadUser();
  }, [token]);

  const login = async (credentials) => {
    const res = await apiLogin(credentials);
    const token = res.data.token;

    if (!token) throw new Error("Token missing from server");

    localStorage.setItem("token", token);
    setToken(token);
    setUser(res.data.user);

    return res.data.user;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        loadingAuth,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
