import { toast } from "@/components/ui/use-toast";

export const showToast = {
  success: (message: string) => {
    toast({
      title: "Success",
      description: message,
      className: "bg-success text-white border-success",
    });
  },
  error: (message: string) => {
    toast({
      title: "Error",
      description: message,
      variant: "destructive",
    });
  },
  info: (message: string) => {
    toast({
      title: "Info",
      description: message,
      className: "bg-primary text-white border-primary",
    });
  },
};
