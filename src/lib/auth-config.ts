import { Provider } from "@supabase/supabase-js";
import { Github, Mail, Chrome } from "lucide-react";

import { SocialProviders, AuthConfig } from "@/types/auth";

export const socialProviders: SocialProviders = {
  google: {
    id: "google",
    name: "Google",
    icon: Chrome,
    scopes: ["email", "profile"],
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  },
  github: {
    id: "github",
    name: "GitHub",
    icon: Github,
    scopes: ["user:email"],
  },
  email: {
    id: "email",
    name: "Email",
    icon: Mail,
  },
};

export const authConfig: AuthConfig = {
  mfa: {
    enabled: true,
    enforced: false,
    authenticatorName: "Auto-Monkey AI",
    backupCodes: 10,
    qrCodeSize: 200,
  },
  session: {
    persistSession: true,
    timeoutSeconds: 3600 * 24 * 7, // 7 days
    rememberMeSeconds: 3600 * 24 * 30, // 30 days
    refreshInterval: 3600, // 1 hour
  },
  socialLayout: "horizontal" as const,
  passwordPolicy: {
    minLength: 8,
    requireNumbers: true,
    requireSpecialChars: true,
    requireUppercase: true,
  },
  rateLimiting: {
    maxAttempts: 5,
    windowSeconds: 300, // 5 minutes
  },
};
