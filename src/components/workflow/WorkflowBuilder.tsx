import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  Plus,
  Play,
  Save,
  Settings,
  MessageSquare,
  Bot,
  Code,
  Database,
  GitBranch as Workflow,
} from "lucide-react";
import AgentChat from "../chat/AgentChat";
import WorkflowCanvas from "./WorkflowCanvas";

const workflowTemplates = [
  {
    id: "web-scraper",
    name: "Web Scraper",
    description: "Scrape and process web data",
    nodes: [
      {
        type: "agent",
        label: "Web Navigator",
        description: "Navigates web pages",
      },
      {
        type: "processor",
        label: "Data Extractor",
        description: "Extracts structured data",
      },
      { type: "data", label: "Storage", description: "Stores processed data" },
    ],
  },
  {
    id: "content-analyzer",
    name: "Content Analyzer",
    description: "Analyze and summarize content",
    nodes: [
      {
        type: "agent",
        label: "Document Reader",
        description: "Reads documents",
      },
      {
        type: "processor",
        label: "Content Analyzer",
        description: "Analyzes content",
      },
      {
        type: "data",
        label: "Results",
        description: "Stores analysis results",
      },
    ],
  },
  {
    id: "data-processor",
    name: "Data Processor",
    description: "Process and transform data",
    nodes: [
      { type: "agent", label: "Data Collector", description: "Collects data" },
      {
        type: "processor",
        label: "Transformer",
        description: "Transforms data",
      },
      { type: "data", label: "Output", description: "Stores results" },
    ],
  },
];

export default function WorkflowBuilder() {
  const [workflows] = useState([
    {
      id: 1,
      name: "Data Processing",
      status: "active",
      description: "Process and analyze data streams",
    },
    {
      id: 2,
      name: "Document Analysis",
      status: "draft",
      description: "Extract and analyze document content",
    },
    {
      id: 3,
      name: "Web Scraping",
      status: "paused",
      description: "Collect data from web sources",
    },
  ]);

  return (
    <ResizablePanelGroup direction="horizontal" className="h-[80vh]">
      <ResizablePanel defaultSize={70}>
        <Tabs defaultValue="canvas" className="h-full">
          <div className="p-6 space-y-6 h-full">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Workflow Builder</h2>
                <p className="text-sm text-muted-foreground">
                  Create and manage automated workflows
                </p>
              </div>
              <div className="space-x-2">
                <Button variant="outline">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Discuss with AI
                </Button>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Workflow
                </Button>
              </div>
            </div>

            <TabsList>
              <TabsTrigger value="canvas">Canvas</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="workflows">Workflows</TabsTrigger>
            </TabsList>

            <TabsContent value="canvas" className="h-[calc(100%-8rem)] mt-2">
              <WorkflowCanvas />
            </TabsContent>

            <TabsContent value="templates" className="mt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {workflowTemplates.map((template) => (
                  <Card
                    key={template.id}
                    className="cursor-pointer hover:border-primary"
                  >
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Workflow className="h-5 w-5" />
                        {template.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        {template.description}
                      </p>
                      <div className="space-y-2">
                        {template.nodes.map((node, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 text-sm"
                          >
                            {node.type === "agent" ? (
                              <Bot className="h-4 w-4" />
                            ) : node.type === "processor" ? (
                              <Code className="h-4 w-4" />
                            ) : (
                              <Database className="h-4 w-4" />
                            )}
                            {node.label}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="workflows" className="mt-2">
              <div className="grid gap-4">
                {workflows.map((workflow) => (
                  <Card key={workflow.id}>
                    <CardHeader>
                      <CardTitle className="flex justify-between items-center">
                        <div>
                          <span>{workflow.name}</span>
                          <p className="text-sm text-muted-foreground mt-1">
                            {workflow.description}
                          </p>
                        </div>
                        <div className="space-x-2">
                          <Button variant="ghost" size="icon">
                            <Play className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Settings className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Save className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Status</span>
                        <span
                          className={`capitalize px-2 py-1 rounded-full text-xs ${workflow.status === "active" ? "bg-success/20 text-success" : workflow.status === "draft" ? "bg-muted text-muted-foreground" : "bg-warning/20 text-warning"}`}
                        >
                          {workflow.status}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </ResizablePanel>

      <ResizableHandle />

      <ResizablePanel defaultSize={30}>
        <AgentChat />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
