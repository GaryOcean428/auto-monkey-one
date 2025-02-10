import { Button } from "../ui/button";
import { Play, Pause, RefreshCw } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { AgentStatus } from "./types";

interface AgentControlsProps {
  status: AgentStatus;
  onStatusChange: () => void;
  onRestart: () => void;
}

export function AgentControls({
  status,
  onStatusChange,
  onRestart,
}: AgentControlsProps) {
  return (
    <div className="flex space-x-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={onStatusChange}>
              {status === "running" ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{status === "running" ? "Pause Agent" : "Start Agent"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={onRestart}
              disabled={status === "stopped"}
            >
              <RefreshCw
                className={`h-4 w-4 ${status === "stopped" ? "opacity-50" : ""}`}
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Restart Agent</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
