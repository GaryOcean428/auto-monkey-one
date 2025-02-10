import { Suspense } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import { ErrorBoundary } from "./components/ErrorBoundary";
import Home from "./components/home";
import Login from "./routes/auth/login";
import AuthCallback from "./routes/auth/callback";
import ResetPassword from "./routes/auth/reset-password";
import routes from "tempo-routes";
import { AuthProvider } from "./contexts/AuthContext";
import { AuthMiddleware } from "./middleware/AuthMiddleware";

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Suspense fallback={<LoadingSpinner />}>
          {/* For the tempo routes */}
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}

          <Routes>
            <Route
              path="/auth/login"
              element={
                <AuthMiddleware requireGuest>
                  <Login />
                </AuthMiddleware>
              }
            />
            <Route
              path="/auth/callback"
              element={
                <AuthMiddleware>
                  <AuthCallback />
                </AuthMiddleware>
              }
            />
            <Route
              path="/auth/reset-password"
              element={
                <AuthMiddleware>
                  <ResetPassword />
                </AuthMiddleware>
              }
            />
            <Route
              path="/"
              element={
                <AuthMiddleware requireAuth>
                  <Home />
                </AuthMiddleware>
              }
            />
            {/* Add this before the catchall route */}
            {import.meta.env.VITE_TEMPO === "true" && (
              <Route path="/tempobook/*" />
            )}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
