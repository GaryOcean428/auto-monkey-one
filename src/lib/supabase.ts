import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

import { authConfig } from "./auth-config";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: authConfig.session.persistSession,
    detectSessionInUrl: true,
    autoRefreshToken: true,
    storage: localStorage,
  },
});
