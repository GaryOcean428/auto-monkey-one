import { Badge } from "../ui/badge";
import { AgentStatus } from "./types";

interface AgentStatusBadgeProps {
  status: AgentStatus;
}

const statusColors = {
  running: "bg-green-500",
  paused: "bg-yellow-500",
  stopped: "bg-red-500",
};

export function AgentStatusBadge({ status }: AgentStatusBadgeProps) {
  return (
    <Badge
      variant="secondary"
      className={`${statusColors[status]} text-background`}
    >
      {status}
    </Badge>
  );
}
