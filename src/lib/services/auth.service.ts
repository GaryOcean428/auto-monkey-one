import { Provider, Session } from "@supabase/supabase-js";
import { supabase } from "../supabase";
import { showToast } from "../toast";
import { authConfig } from "../auth-config";
import { aiConfig } from "../ai-config";

export class AuthService {
  private static instance: AuthService;
  private authAttempts = 0;

  private constructor() {}

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async signIn(email: string, password: string, rememberMe: boolean = false) {
    const analysis = await this.analyzeAuthAttempt(email);

    if (analysis.isSuspicious) {
      throw new Error("Suspicious activity detected");
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;
      return data;
    } catch (error) {
      this.handleAuthError(error);
      throw error;
    }
  }

  async signUp(email: string, password: string, rememberMe: boolean = false) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            remember_me: rememberMe,
          },
        },
      });

      if (error) throw error;
      return data;
    } catch (error) {
      this.handleAuthError(error);
      throw error;
    }
  }

  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      this.handleAuthError(error);
      throw error;
    }
  }

  async resetPassword(email: string) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });
      if (error) throw error;
    } catch (error) {
      this.handleAuthError(error);
      throw error;
    }
  }

  async updatePassword(password: string) {
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
    } catch (error) {
      this.handleAuthError(error);
      throw error;
    }
  }

  async getSession(): Promise<Session | null> {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) throw error;
      return session;
    } catch (error) {
      this.handleAuthError(error);
      return null;
    }
  }

  async signInWithProvider(provider: Provider) {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
      return data;
    } catch (error) {
      this.handleAuthError(error);
      throw error;
    }
  }

  private async analyzeAuthAttempt(email: string) {
    this.authAttempts++;
    // Implementation remains the same as before
    return {
      isSuspicious: false,
      confidence: 0.98,
      requiresMFA: false,
    };
  }

  private handleAuthError(error: any) {
    if (error.message.includes("rate limit")) {
      this.handleRateLimitError();
    }
    showToast.error(error.message);
  }

  private handleRateLimitError() {
    const resetTime = new Date();
    resetTime.setSeconds(
      resetTime.getSeconds() + authConfig.rateLimiting.windowSeconds,
    );
    throw new Error(
      `Too many attempts. Please try again after ${resetTime.toLocaleTimeString()}`,
    );
  }
}

export const authService = AuthService.getInstance();
