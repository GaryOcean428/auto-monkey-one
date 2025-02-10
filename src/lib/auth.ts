import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "./supabase";
import { authService } from "./services/auth.service";

let authAttempts = 0;

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Get initial session
    authService.getSession().then(setSession);

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return session;
}

async function analyzeAuthAttempt(email: string) {
  try {
    // Select model based on security needs and complexity
    let model;
    if (authAttempts >= aiConfig.auth.maxBasicAttempts) {
      model = aiConfig.models.reasoning; // Use o1 for high-security cases
    } else if (needsRealtimeAnalysis()) {
      model = aiConfig.models.realtime; // Use realtime model for immediate feedback
    } else if (isComplexOperation()) {
      model = aiConfig.models.reasoningLatest; // Use o3-mini for complex but not critical ops
    } else {
      model = aiConfig.models.fast; // Use fast model for basic operations
    }

    // Here you would make the actual OpenAI API call to analyze the auth attempt
    // For now we'll just simulate the analysis
    const isSuspicious = false;
    const confidence = 0.98;
    const complexity = 0.5;

    // Determine if we need to upgrade the model
    const needsUpgrade =
      complexity > aiConfig.modelSelection.complexityThreshold ||
      confidence < aiConfig.modelSelection.securityThreshold;

    return {
      isSuspicious,
      confidence,
      requiresMFA:
        confidence < aiConfig.auth.confidenceThreshold || needsUpgrade,
      recommendedModel: needsUpgrade ? aiConfig.models.reasoning : model,
    };
  } catch (error) {
    console.error("Auth analysis error:", error);
    return {
      isSuspicious: true,
      confidence: 0,
      requiresMFA: true,
      recommendedModel: aiConfig.models.reasoning,
    };
  }
}

function needsRealtimeAnalysis() {
  // Implement logic to determine if realtime analysis is needed
  return false;
}

function isComplexOperation() {
  // Implement logic to determine operation complexity
  return false;
}

export async function signInWithProvider(provider: Provider) {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        ...socialProviders[provider]?.options,
      },
    });
    if (error) throw error;
    return data;
  } catch (error) {
    showToast.error(error.message);
    throw error;
  }
}

export async function setupMFA() {
  try {
    const { data, error } = await supabase.auth.mfa.enroll({
      factorType: "totp",
    });
    if (error) throw error;
    return data;
  } catch (error) {
    showToast.error(error.message);
    throw error;
  }
}

export async function verifyMFA(code: string) {
  try {
    const { data, error } = await supabase.auth.mfa.verify({
      factorId: "totp",
      code,
    });
    if (error) throw error;
    return data;
  } catch (error) {
    showToast.error(error.message);
    throw error;
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    showToast.success("Successfully signed out");
  } catch (error) {
    showToast.error(error.message);
  }
}

export async function resetPassword(email: string) {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });
    if (error) throw error;
    showToast.success("Password reset email sent");
  } catch (error) {
    showToast.error(error.message);
  }
}

export async function updatePassword(password: string) {
  try {
    const { error } = await supabase.auth.updateUser({
      password,
    });
    if (error) throw error;
    showToast.success("Password updated successfully");
  } catch (error) {
    showToast.error(error.message);
  }
}

export async function getSession() {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  } catch (error) {
    showToast.error(error.message);
    return null;
  }
}
