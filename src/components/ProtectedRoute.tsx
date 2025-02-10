import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const session = useAuth();

  if (!session) {
    return <Navigate to="/auth/login" replace />;
  }

  return <>{children}</>;
}
