export type AgentStatus = "running" | "paused" | "stopped";

export interface AgentCardProps {
  id: string;
  name?: string;
  status?: AgentStatus;
  memoryUsage?: number;
  cpuUsage?: number;
  taskProgress?: number;
  currentTask?: string;
}
