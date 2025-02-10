import React from "react";
import { useAgentStore } from "../store/agentStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent } from "./ui/card";
import { Bot, Cpu, Settings, Zap } from "lucide-react";

interface CreateAgentModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit?: (data: any) => void;
}

const CreateAgentModal = ({
  open = true,
  onOpenChange = () => {},
  onSubmit = () => {},
}: CreateAgentModalProps) => {
  const createAgent = useAgentStore((state) => state.createAgent);

  const handleSubmit = (data: any) => {
    createAgent({
      name: data.name || "New Agent",
      status: "stopped",
      memoryUsage: 0,
      cpuUsage: 0,
      taskProgress: 0,
      currentTask: "Initializing...",
    });
    onSubmit(data);
  };
  const templates = [
    {
      id: 1,
      name: "Data Processing Agent",
      description: "Optimized for handling large data streams",
    },
    {
      id: 2,
      name: "Customer Service Agent",
      description: "Specialized in handling customer interactions",
    },
    {
      id: 3,
      name: "Research Assistant",
      description: "Focused on gathering and analyzing information",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[640px] bg-background">
        <DialogHeader>
          <DialogTitle>Create New Agent</DialogTitle>
          <DialogDescription>
            Configure your AI agent by selecting a template and customizing its
            settings.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="template" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="template">Template</TabsTrigger>
            <TabsTrigger value="configuration">Configuration</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="template" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {templates.map((template) => (
                <Card
                  key={template.id}
                  className="cursor-pointer hover:border-primary"
                >
                  <CardContent className="flex items-start space-x-4 pt-6">
                    <Bot className="w-6 h-6 text-primary" />
                    <div>
                      <h3 className="font-medium">{template.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {template.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="configuration" className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Agent Name</Label>
                <Input id="name" placeholder="Enter agent name" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="type">Agent Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select agent type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="processing">Processing Agent</SelectItem>
                    <SelectItem value="analysis">Analysis Agent</SelectItem>
                    <SelectItem value="interaction">
                      Interaction Agent
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Input id="description" placeholder="Enter agent description" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-4">
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Cpu className="w-4 h-4" />
                  <Label>CPU Allocation</Label>
                </div>
                <Select defaultValue="medium">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low (1 Core)</SelectItem>
                    <SelectItem value="medium">Medium (2 Cores)</SelectItem>
                    <SelectItem value="high">High (4 Cores)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4" />
                  <Label>Memory Allocation</Label>
                </div>
                <Select defaultValue="medium">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">2GB RAM</SelectItem>
                    <SelectItem value="medium">4GB RAM</SelectItem>
                    <SelectItem value="high">8GB RAM</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Settings className="w-4 h-4" />
                  <Label>Priority Level</Label>
                </div>
                <Select defaultValue="normal">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onSubmit({})}>Create Agent</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAgentModal;
