import React, { createContext, useContext, useState, useRef } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Gunakan useRef supaya flag tidak reset tiap render
  const loginToastShown = useRef(false);
  const registerToastShown = useRef(false);
  const logoutToastShown = useRef(false);

  const login = () => {
    setIsLoggedIn(true);
    if (!loginToastShown.current) {
      toast.success("Berhasil login!", { toastId: "login" });
      loginToastShown.current = true;
      registerToastShown.current = false; // reset lain jika perlu
      logoutToastShown.current = false;
    }
  };

  const register = () => {
    setIsLoggedIn(true);
    if (!registerToastShown.current) {
      toast.success("Registrasi berhasil!", { toastId: "register" });
      registerToastShown.current = true;
      loginToastShown.current = false;
      logoutToastShown.current = false;
    }
  };

  const logout = () => {
    setIsLoggedIn(false);

    // Reset semua flag dan dismiss toast agar notif bisa muncul lagi next time
    loginToastShown.current = false;
    registerToastShown.current = false;
    logoutToastShown.current = false;

    toast.dismiss(); // hapus semua toast aktif

    if (!toast.isActive("logout")) {
      toast.success("Berhasil logout", { toastId: "logout" });
      logoutToastShown.current = true;
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
