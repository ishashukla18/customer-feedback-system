import { createContext, useContext, useState } from "react";
import { api } from "../api.js";

const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user") || "null"));
  const authenticate = async (path, form) => {
    const data = await api(path, { method: "POST", body: JSON.stringify(form) });
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };
  return <AuthContext.Provider value={{ user, login: (form) => authenticate("/auth/login", form), register: (form) => authenticate("/auth/register", form), logout }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
