import { Handle, Position } from "reactflow";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Code, Database } from "lucide-react";

export function AgentNode({ data }: { data: any }) {
  return (
    <Card className="w-[200px] bg-background border-primary">
      <CardHeader className="p-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <Bot className="h-4 w-4" />
          {data.label}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 pt-0 text-xs text-muted-foreground">
        {data.description}
      </CardContent>
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </Card>
  );
}

export function ProcessorNode({ data }: { data: any }) {
  return (
    <Card className="w-[200px] bg-background border-secondary">
      <CardHeader className="p-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <Code className="h-4 w-4" />
          {data.label}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 pt-0 text-xs text-muted-foreground">
        {data.description}
      </CardContent>
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </Card>
  );
}

export function DataNode({ data }: { data: any }) {
  return (
    <Card className="w-[200px] bg-background border-accent">
      <CardHeader className="p-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <Database className="h-4 w-4" />
          {data.label}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 pt-0 text-xs text-muted-foreground">
        {data.description}
      </CardContent>
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </Card>
  );
}
