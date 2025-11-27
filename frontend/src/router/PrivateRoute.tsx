// src/router/PrivateRoute.tsx
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  if (!user?.token) return <Navigate to="/login" replace />;
  return <>{children}</>;
}
