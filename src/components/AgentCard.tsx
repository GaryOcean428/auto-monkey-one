import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Play, Pause, RefreshCw, HardDrive, Cpu } from "lucide-react";
import { Button } from "./ui/button";

interface AgentCardProps {
  name?: string;
  status?: "running" | "paused" | "stopped";
  memoryUsage?: number;
  cpuUsage?: number;
  taskProgress?: number;
  currentTask?: string;
}

import { useAgentStore } from "../store/agentStore";

import { memo } from "react";
import { useThrottle } from "@/hooks/useThrottle";

const AgentCard = memo(
  function AgentCard({
    name = "Agent Smith",
    status = "running",
    memoryUsage = 45,
    cpuUsage = 32,
    taskProgress = 67,
    currentTask = "Processing data streams",
  }: AgentCardProps) {
    const statusColors = {
      running: "bg-green-500",
      paused: "bg-yellow-500",
      stopped: "bg-red-500",
    };

    const updateAgentStatus = useAgentStore((state) => state.updateAgentStatus);

    const handleStatusChange = () => {
      const newStatus = status === "running" ? "paused" : "running";
      updateAgentStatus(name, newStatus);
    };

    return (
      <Card className="w-[384px] bg-background border-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold text-lg">{name}</h3>
            <Badge
              variant="secondary"
              className={`${statusColors[status]} text-background`}
            >
              {status}
            </Badge>
          </div>
          <div className="flex space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleStatusChange}
                  >
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
                  <Button variant="ghost" size="icon">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Restart Agent</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Current Task</span>
                <span>{currentTask}</span>
              </div>
              <Progress value={taskProgress} className="h-2" />
            </div>
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
          </div>
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleTimeString()}
        </CardFooter>
      </Card>
    );
  },
  (prevProps, nextProps) => {
    // Only re-render if these props change
    return (
      prevProps.status === nextProps.status &&
      prevProps.memoryUsage === nextProps.memoryUsage &&
      prevProps.cpuUsage === nextProps.cpuUsage &&
      prevProps.taskProgress === nextProps.taskProgress &&
      prevProps.currentTask === nextProps.currentTask
    );
  },
);

export default AgentCard;
