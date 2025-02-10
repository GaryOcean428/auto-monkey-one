import { Loader2 } from "lucide-react";

export function LoadingSpinner() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-4 bg-background">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-sm text-muted-foreground">Loading...</p>
    </div>
  );
}
