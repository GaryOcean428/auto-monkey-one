import { Plus } from "lucide-react";
import { Button } from "../ui/button";

interface AgentGridHeaderProps {
  onCreateAgent: () => void;
}

export function AgentGridHeader({ onCreateAgent }: AgentGridHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold">Active Agents</h2>
      <Button onClick={onCreateAgent} className="flex items-center gap-2">
        <Plus className="h-4 w-4" />
        Create Agent
      </Button>
    </div>
  );
}
