import { HardDrive, Cpu } from "lucide-react";

interface AgentMetricsProps {
  memoryUsage: number;
  cpuUsage: number;
}

export function AgentMetrics({ memoryUsage, cpuUsage }: AgentMetricsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <HardDrive className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Memory</span>
        </div>
        <div className="text-2xl font-bold">{memoryUsage}%</div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Cpu className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">CPU</span>
        </div>
        <div className="text-2xl font-bold">{cpuUsage}%</div>
      </div>
    </div>
  );
}
