import { Provider, Session, User, UserResponse } from "@supabase/supabase-js";

// Auth State Types
export interface AuthState {
  session: Session | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
  rememberMe: boolean;
  setSession: (session: Session | null) => void;
  setRememberMe: (remember: boolean) => void;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
  initialize: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<UserResponse>;
}

// Auth Response Types
export interface AuthResponse {
  data: {
    session: Session | null;
    user: User | null;
  };
  error: Error | null;
}

// Auth Analysis Types
export interface AuthAnalysis {
  isSuspicious: boolean;
  confidence: number;
  requiresMFA: boolean;
  recommendedModel: string;
}

// Auth Config Types
export interface AuthConfig {
  mfa: {
    enabled: boolean;
    enforced: boolean;
    authenticatorName: string;
    backupCodes: number;
    qrCodeSize: number;
  };
  session: {
    persistSession: boolean;
    timeoutSeconds: number;
    rememberMeSeconds: number;
    refreshInterval: number;
  };
  socialLayout: "horizontal" | "vertical";
  passwordPolicy: {
    minLength: number;
    requireNumbers: boolean;
    requireSpecialChars: boolean;
    requireUppercase: boolean;
  };
  rateLimiting: {
    maxAttempts: number;
    windowSeconds: number;
  };
}

// Social Provider Types
export interface SocialProvider {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  scopes?: string[];
}

export interface SocialProviders {
  [key: string]: SocialProvider;
}

// Password Validation Types
export interface PasswordValidation {
  isValid: boolean;
  errors: string[];
}

// MFA Types
export interface MFASetupResponse {
  qr: string;
  secret: string;
}

export interface MFAVerifyResponse {
  verified: boolean;
}

// Auth Storage Types
export interface AuthStorage {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
}

// Auth Event Types
export type AuthEventType =
  | "SIGNED_IN"
  | "SIGNED_OUT"
  | "USER_UPDATED"
  | "USER_DELETED"
  | "PASSWORD_RECOVERY"
  | "TOKEN_REFRESHED"
  | "MFA_ENABLED"
  | "MFA_DISABLED";

export interface AuthEventData {
  event: AuthEventType;
  session: Session | null;
}
