import { useState } from "react";
import AuthContext, {
  type AuthUser,
  type AuthContextType,
} from "./AuthContext";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Inicializamos el state leyendo localStorage sin useEffect
  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = localStorage.getItem("authUser");
    return stored ? (JSON.parse(stored) as AuthUser) : null;
  });

  const login = (data: AuthUser) => {
    setUser(data);
    localStorage.setItem("authUser", JSON.stringify(data));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authUser");
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
