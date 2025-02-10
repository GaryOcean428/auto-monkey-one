type ErrorSeverity = "low" | "medium" | "high" | "critical";

interface ErrorDetails {
  message: string;
  stack?: string;
  severity: ErrorSeverity;
  context?: Record<string, any>;
}

class ErrorMonitor {
  private static instance: ErrorMonitor;
  private errors: ErrorDetails[] = [];

  private constructor() {
    this.setupGlobalHandlers();
  }

  static getInstance(): ErrorMonitor {
    if (!ErrorMonitor.instance) {
      ErrorMonitor.instance = new ErrorMonitor();
    }
    return ErrorMonitor.instance;
  }

  private setupGlobalHandlers() {
    window.addEventListener("error", (event) => {
      this.logError({
        message: event.message,
        stack: event.error?.stack,
        severity: "high",
        context: {
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
        },
      });
    });

    window.addEventListener("unhandledrejection", (event) => {
      this.logError({
        message: event.reason?.message || "Unhandled Promise Rejection",
        stack: event.reason?.stack,
        severity: "critical",
        context: {
          reason: event.reason,
        },
      });
    });
  }

  logError(error: ErrorDetails) {
    this.errors.push({
      ...error,
      context: {
        ...error.context,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href,
      },
    });

    // In production, you would send this to your error tracking service
    if (process.env.NODE_ENV === "production") {
      // Send to error tracking service
      console.error("Error logged:", error);
    }
  }

  getErrors() {
    return this.errors;
  }

  clearErrors() {
    this.errors = [];
  }
}

export const errorMonitor = ErrorMonitor.getInstance();
