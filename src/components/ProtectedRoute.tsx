import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { session, loading, initialized } = useAuth();

  // Show loading state during initial auth check
  if (loading || !initialized) {
    return <LoadingSpinner />;
  }

  // Redirect to login if no session
  if (!session) {
    return <Navigate to="/auth/login" replace />;
  }

  return <>{children}</>;
};

export { ProtectedRoute };
