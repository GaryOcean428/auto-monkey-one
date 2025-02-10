import React from "react";
import AgentCard from "../AgentCard";
import { AgentGridHeader } from "./AgentGridHeader";
import { useAgentStore } from "@/store/agentStore";

interface AgentGridProps {
  onCreateAgent?: () => void;
}

const AgentGrid = React.memo(function AgentGrid({
  onCreateAgent = () => {},
}: AgentGridProps) {
  const agents = useAgentStore((state) => state.agents);

  return (
    <div className="w-full h-full bg-background p-6">
      <AgentGridHeader onCreateAgent={onCreateAgent} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <AgentCard
            key={agent.id}
            id={agent.id}
            name={agent.name}
            status={agent.status}
            memoryUsage={agent.memoryUsage}
            cpuUsage={agent.cpuUsage}
            taskProgress={agent.taskProgress}
            currentTask={agent.currentTask}
          />
        ))}
      </div>
    </div>
  );
});

export default AgentGrid;
