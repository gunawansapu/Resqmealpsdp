import React, { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    setIsLoggedIn(true);
    if (!toast.isActive("login")) {
      toast.success("Berhasil login!", { toastId: "login" });
    }
  };

  const register = () => {
    setIsLoggedIn(true);
    if (!toast.isActive("register")) {
      toast.success("Registrasi berhasil!", { toastId: "register" });
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    if (!toast.isActive("logout")) {
      toast.success("Berhasil logout", { toastId: "logout" });
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);