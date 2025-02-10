import { supabase } from "./supabase";
import { showToast } from "./toast";
import { authConfig } from "./auth-config";
import { aiConfig } from "./ai-config";
import { Provider } from "@supabase/supabase-js";
import { socialProviders } from "./auth-config";
import {
  AuthAnalysis,
  MFASetupResponse,
  MFAVerifyResponse,
} from "@/types/auth";

let authAttempts = 0;

async function analyzeAuthAttempt(email: string): Promise<AuthAnalysis> {
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

export async function setupMFA(): Promise<MFASetupResponse> {
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

export async function verifyMFA(code: string): Promise<MFAVerifyResponse> {
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

export async function updatePassword(password: string) {
  try {
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      if (error.message.includes("stronger password")) {
        throw new Error(
          "Please use a stronger password. It should include numbers, special characters, and uppercase letters.",
        );
      }
      throw error;
    }
    showToast.success("Password updated successfully");
  } catch (error) {
    showToast.error(error.message);
    throw error;
  }
}

export { analyzeAuthAttempt };
