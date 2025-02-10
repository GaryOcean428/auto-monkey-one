import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface AuthMiddlewareProps {
  children: ReactNode;
  requireAuth?: boolean;
  requireGuest?: boolean;
}

export function AuthMiddleware({
  children,
  requireAuth = false,
  requireGuest = false,
}: AuthMiddlewareProps) {
  const { session, loading, initialized } = useAuth();
  const location = useLocation();

  // Show loading state during initialization
  if (loading || !initialized) {
    return <LoadingSpinner />;
  }

  // Handle auth-required routes
  if (requireAuth && !session) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // Handle guest-only routes (like login)
  if (requireGuest && session) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
