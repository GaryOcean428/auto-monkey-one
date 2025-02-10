import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { socialProviders, authConfig } from "@/lib/auth-config";
import { Provider } from "@supabase/supabase-js";
import { signInWithProvider } from "@/lib/auth";
import { validatePassword } from "@/lib/auth-utils";
import { useAuth } from "@/contexts/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Mail, Lock, ArrowRight } from "lucide-react";
import { showToast } from "@/lib/toast";
import { Toaster } from "@/components/ui/toaster";

type AuthMode = "signin" | "signup";

export default function AuthForm() {
  const [mode, setMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [rateLimitExceeded, setRateLimitExceeded] = useState(false);
  const [rateLimitReset, setRateLimitReset] = useState<Date | null>(null);
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (rateLimitExceeded) {
        showToast.error(
          `Too many attempts. Please try again after ${rateLimitReset?.toLocaleTimeString()}`,
        );
        return;
      }

      if (mode === "signup") {
        const { isValid, errors } = validatePassword(password);
        if (!isValid) {
          setPasswordErrors(errors);
          showToast.error(errors[0]);
          setLoading(false);
          return;
        }
      }

      const data = await signIn(email, password);

      if (data.error) {
        if (data.error.message.includes("rate limit")) {
          setRateLimitExceeded(true);
          const resetTime = new Date();
          resetTime.setSeconds(
            resetTime.getSeconds() + authConfig.rateLimiting.windowSeconds,
          );
          setRateLimitReset(resetTime);
          throw new Error(
            `Too many attempts. Please try again after ${resetTime.toLocaleTimeString()}`,
          );
        }
        throw data.error;
      }

      if (mode === "signup") {
        showToast.success("Please check your email for the confirmation link.");
      } else {
        showToast.success("Successfully signed in!");
        navigate("/");
      }
    } catch (err) {
      showToast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="w-[400px] bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/75 border-border/50 shadow-xl shadow-primary/5">
          <CardHeader>
            <CardTitle className="text-2xl font-bold tracking-tight">
              {mode === "signin" ? "Welcome back" : "Create account"}
            </CardTitle>
            <CardDescription>
              {mode === "signin"
                ? "Enter your credentials to access your account"
                : "Enter your details to create your account"}
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleAuth}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                    autoComplete="current-password"
                  />
                </div>
                {passwordErrors.length > 0 && (
                  <ul className="text-sm text-destructive space-y-1">
                    {passwordErrors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) =>
                    setRememberMe(checked as boolean)
                  }
                />
                <Label htmlFor="remember" className="text-sm font-normal">
                  Remember me for{" "}
                  {authConfig.session.rememberMeSeconds / (3600 * 24)} days
                </Label>
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground text-center">
                  Or continue with
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {Object.values(socialProviders).map((provider) => (
                    <Button
                      key={provider.id}
                      variant="outline"
                      className="w-full"
                      onClick={() =>
                        signInWithProvider(provider.id as Provider)
                      }
                      disabled={loading}
                    >
                      <provider.icon className="mr-2 h-4 w-4" />
                      {provider.name}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={loading || rateLimitExceeded}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {mode === "signin"
                      ? "Signing in..."
                      : "Creating account..."}
                  </>
                ) : (
                  <>
                    {mode === "signin" ? "Sign in" : "Sign up"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="hover:bg-primary/10"
                onClick={() => {
                  setMode(mode === "signin" ? "signup" : "signin");
                  setPasswordErrors([]);
                }}
              >
                {mode === "signin"
                  ? "Need an account? Sign up"
                  : "Already have an account? Sign in"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
      <Toaster />
    </>
  );
}
