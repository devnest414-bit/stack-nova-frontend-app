import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On first load, check if a valid session cookie exists
  useEffect(() => {
    const loadUser = async () => {
      try {
        const { data } = await api.get("/auth/me");
        setUser(data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const register = async (name, email, password) => {
    const { data } = await api.post("/auth/register", { name, email, password });
    setUser(data);
    return data;
  };

  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    setUser(data);
    return data;
  };

  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
  };

  const updateProfile = async (updates) => {
    const { data } = await api.put("/users/profile", updates);
    setUser(data);
    return data;
  };

  const uploadAvatar = async (file) => {
    const formData = new FormData();
    formData.append("avatar", file);
    const { data } = await api.post("/users/avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setUser(data);
    return data;
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout, updateProfile, uploadAvatar }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
