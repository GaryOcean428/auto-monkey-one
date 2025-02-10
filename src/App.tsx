import { Suspense, useEffect } from "react";
import {
  useRoutes,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { ErrorBoundary } from "./components/ErrorBoundary";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/home";
import Login from "./routes/auth/login";
import AuthCallback from "./routes/auth/callback";
import ResetPassword from "./routes/auth/reset-password";
import routes from "tempo-routes";
import { supabase } from "./lib/supabase";
import { showToast } from "./lib/toast";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        showToast.info("You have been signed out");
        navigate("/auth/login");
      } else if (event === "SIGNED_IN") {
        showToast.success("Successfully signed in");
        navigate("/");
      } else if (event === "PASSWORD_RECOVERY") {
        navigate("/auth/reset-password");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <div className="min-h-screen w-full flex items-center justify-center bg-background">
            <div className="animate-pulse text-primary">Loading...</div>
          </div>
        }
      >
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
    </ErrorBoundary>
  );
}

export default App;
