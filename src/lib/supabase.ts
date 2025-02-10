import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

import { authConfig } from "./auth-config";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    detectSessionInUrl: true,
    autoRefreshToken: true,
    storage: {
      getItem: (key) => {
        const item = localStorage.getItem(key);
        const expires = localStorage.getItem(`${key}_expires`);
        if (!item || !expires) return null;
        if (new Date().getTime() > parseInt(expires)) {
          localStorage.removeItem(key);
          localStorage.removeItem(`${key}_expires`);
          return null;
        }
        return item;
      },
      setItem: (key, value) => {
        localStorage.setItem(key, value);
        const expires = new Date();
        expires.setDate(
          expires.getDate() +
            authConfig.session.rememberMeSeconds / (24 * 3600),
        );
        localStorage.setItem(`${key}_expires`, expires.getTime().toString());
      },
      removeItem: (key) => {
        localStorage.removeItem(key);
        localStorage.removeItem(`${key}_expires`);
      },
    },
  },
});
