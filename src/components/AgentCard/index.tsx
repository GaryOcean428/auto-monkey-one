import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Toaster } from "../ui/toaster";
import { AgentStatusBadge } from "./AgentStatusBadge";
import { AgentControls } from "./AgentControls";
import { AgentMetrics } from "./AgentMetrics";
import { AgentTask } from "./AgentTask";
import { useAgentControls } from "./hooks/useAgentControls";
import type { AgentCardProps } from "./types";

const AgentCard = React.memo(
  function AgentCard({
    id,
    name = "Agent Smith",
    status = "running",
    memoryUsage = 45,
    cpuUsage = 32,
    taskProgress = 67,
    currentTask = "Processing data streams",
  }: AgentCardProps) {
    const { handleStatusChange, handleRestart } = useAgentControls(id, status);

    return (
      <>
        <Card className="w-[384px] bg-background border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-lg">{name}</h3>
              <AgentStatusBadge status={status} />
            </div>
            <AgentControls
              status={status}
              onStatusChange={handleStatusChange}
              onRestart={handleRestart}
            />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <AgentTask task={currentTask} progress={taskProgress} />
              <AgentMetrics memoryUsage={memoryUsage} cpuUsage={cpuUsage} />
            </div>
          </CardContent>
          <CardFooter className="text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleTimeString()}
          </CardFooter>
        </Card>
        <Toaster />
      </>
    );
  },
  (prevProps, nextProps) => {
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
