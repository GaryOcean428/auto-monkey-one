import { z } from "zod";

const envSchema = z.object({
  VITE_SUPABASE_URL: z.string().url(),
  VITE_SUPABASE_ANON_KEY: z.string().min(1),
  VITE_TEMPO: z.string().optional(),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

function validateEnv() {
  try {
    return envSchema.parse({
      VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
      VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
      VITE_TEMPO: import.meta.env.VITE_TEMPO,
      NODE_ENV: import.meta.env.MODE,
    });
  } catch (error) {
    console.error("Invalid environment variables:", error);
    throw new Error("Invalid environment variables");
  }
}

export const env = validateEnv();
