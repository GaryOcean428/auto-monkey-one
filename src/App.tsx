import { Suspense, useEffect } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  useRoutes,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Home from "./components/home";
import Login from "./routes/auth/login";
import AuthCallback from "./routes/auth/callback";
import ResetPassword from "./routes/auth/reset-password";
import routes from "tempo-routes";
import { useAuthStore } from "./store/authStore";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  const navigate = useNavigate();
  const { initialize } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    const unsubscribe = useAuthStore.subscribe((state, prevState) => {
      if (!prevState.session && state.session) {
        navigate("/");
      } else if (prevState.session && !state.session) {
        navigate("/auth/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <ErrorBoundary>
      <AuthProvider>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/auth/reset-password" element={<ResetPassword />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            {import.meta.env.VITE_TEMPO === "true" && (
              <Route path="/tempobook/*" element={useRoutes(routes)} />
            )}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
