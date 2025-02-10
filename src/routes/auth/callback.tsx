import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const { error } = await supabase.auth.getSession();
        if (error) throw error;
        navigate("/");
      } catch (error) {
        console.error("Error during auth callback:", error);
        navigate("/auth/login");
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <div className="animate-pulse">Completing authentication...</div>
    </div>
  );
}
