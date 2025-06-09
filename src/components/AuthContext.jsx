import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [toastData, setToastData] = useState(null);

  const showToast = (message, type = "success") => {
    const id = Date.now(); // ID unik agar meskipun pesannya sama tetap muncul
    setToastData({ id, message, type });
  };

  useEffect(() => {
    if (toastData) {
      toast[toastData.type](toastData.message, {
        toastId: toastData.id, // tetap beri ID agar tidak duplikat saat spam klik
      });
    }
  }, [toastData]);

  const login = () => {
    setIsLoggedIn(true);
    showToast("Berhasil login!");
  };

  const register = () => {
    setIsLoggedIn(true);
    showToast("Registrasi berhasil!");
  };

  const logout = () => {
    setIsLoggedIn(false);
    showToast("Berhasil logout!");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);