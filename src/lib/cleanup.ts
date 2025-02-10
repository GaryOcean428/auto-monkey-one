export function cleanupIntervals() {
  // Clean up any existing intervals
  if ((window as any).__agentUpdateInterval) {
    clearInterval((window as any).__agentUpdateInterval);
    delete (window as any).__agentUpdateInterval;
  }
}

export function registerCleanup() {
  // Use beforeunload instead of unload
  window.addEventListener("beforeunload", () => {
    cleanupIntervals();
  });

  // Also clean up on visibilitychange to handle tab closing
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      cleanupIntervals();
    }
  });
}
