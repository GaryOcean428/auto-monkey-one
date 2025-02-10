import React from "react";
import AgentCard from "./AgentCard";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { useAgentStore } from "../store/agentStore";

interface AgentGridProps {
  onCreateAgent?: () => void;
}

const AgentGrid = ({ onCreateAgent = () => {} }: AgentGridProps) => {
  const agents = useAgentStore((state) => state.agents);
  return (
    <div className="w-full h-full bg-background p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Active Agents</h2>
        <Button onClick={onCreateAgent} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Agent
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <AgentCard
            key={agent.id}
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
};

export default AgentGrid;
