export interface Agent {
  id: string;
  name: string;
  status: "running" | "paused" | "stopped";
  memoryUsage: number;
  cpuUsage: number;
  taskProgress: number;
  currentTask: string;
}

export interface AgentTemplate {
  id: number;
  name: string;
  description: string;
}

export interface AgentMetrics {
  efficiency: number;
  completionRate: number;
  resourceUtilization: number;
  dailyTasks: Array<{
    date: string;
    completed: number;
    total: number;
  }>;
  resourceHistory: Array<{
    timestamp: string;
    cpu: number;
    memory: number;
  }>;
}
