class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number[]> = new Map();

  private constructor() {
    this.setupObservers();
  }

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  private setupObservers() {
    // Setup Performance Observer
    if ("PerformanceObserver" in window) {
      const paintObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.logMetric(`paint.${entry.name}`, entry.startTime);
        }
      });

      paintObserver.observe({ entryTypes: ["paint"] });

      const layoutShiftObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.logMetric("layout-shift", entry.value);
        }
      });

      layoutShiftObserver.observe({ entryTypes: ["layout-shift"] });
    }
  }

  startMeasure(name: string) {
    performance.mark(`${name}-start`);
  }

  endMeasure(name: string) {
    performance.mark(`${name}-end`);
    performance.measure(name, `${name}-start`, `${name}-end`);

    const entries = performance.getEntriesByName(name);
    const duration = entries[entries.length - 1].duration;
    this.logMetric(name, duration);

    // Cleanup
    performance.clearMarks(`${name}-start`);
    performance.clearMarks(`${name}-end`);
    performance.clearMeasures(name);
  }

  private logMetric(name: string, value: number) {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }
    this.metrics.get(name)?.push(value);

    // Keep only last 100 measurements
    if (this.metrics.get(name)!.length > 100) {
      this.metrics.get(name)?.shift();
    }
  }

  getMetrics(name: string) {
    return this.metrics.get(name) || [];
  }

  getAverageMetric(name: string) {
    const metrics = this.getMetrics(name);
    if (metrics.length === 0) return 0;
    return metrics.reduce((a, b) => a + b, 0) / metrics.length;
  }

  clearMetrics() {
    this.metrics.clear();
  }
}

export const performanceMonitor = PerformanceMonitor.getInstance();
