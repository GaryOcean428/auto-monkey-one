export type AgentStatus = "running" | "paused" | "stopped";

export interface Agent {
  id: string;
  name: string;
  status: AgentStatus;
  memoryUsage: number;
  cpuUsage: number;
  taskProgress: number;
  currentTask: string;
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
