export const aiConfig = {
  models: {
    // Primary flagship model for complex tasks
    primary: "gpt-4o-latest",
    // Fast model for basic operations
    fast: "gpt-4o-mini",
    // Real-time model for immediate feedback
    realtime: "gpt-4o-realtime-preview",
    // Complex reasoning model
    reasoning: "o1",
    // Fast reasoning model
    reasoningFast: "o1-mini",
    // Latest small reasoning model
    reasoningLatest: "o3-mini",
  },
  auth: {
    // Max attempts before switching to more secure model
    maxBasicAttempts: 3,
    // Confidence threshold for auth decisions
    confidenceThreshold: 0.95,
    // Timeout for realtime auth checks (ms)
    realtimeTimeout: 2000,
  },
  modelSelection: {
    // Thresholds for switching to more powerful models
    complexityThreshold: 0.7,
    securityThreshold: 0.8,
    // Minimum confidence required for critical operations
    criticalOpConfidence: 0.98,
  },
};
