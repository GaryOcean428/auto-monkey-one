import { Progress } from "../ui/progress";

interface AgentTaskProps {
  task: string;
  progress: number;
}

export function AgentTask({ task, progress }: AgentTaskProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Current Task</span>
        <span>{task}</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
}
