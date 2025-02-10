import { createContext, useContext, ReactNode } from "react";
import { Session } from "@supabase/supabase-js";
import { useAuthStore } from "@/store/authStore";

interface AuthContextType {
  session: Session | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
  rememberMe: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
  setRememberMe: (remember: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuthStore();

  const value = {
    session: auth.session,
    loading: auth.loading,
    error: auth.error,
    initialized: auth.initialized,
    rememberMe: auth.rememberMe,
    signIn: auth.signIn,
    signOut: auth.signOut,
    resetPassword: auth.resetPassword,
    updatePassword: auth.updatePassword,
    setRememberMe: auth.setRememberMe,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
