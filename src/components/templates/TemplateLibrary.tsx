import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bot, Code, FileText, Search, Plus } from "lucide-react";

export default function TemplateLibrary() {
  const [templates] = useState([
    {
      id: 1,
      name: "Web Scraper",
      type: "agent",
      description: "Template for web scraping tasks",
    },
    {
      id: 2,
      name: "Data Processor",
      type: "workflow",
      description: "Process and analyze data",
    },
    {
      id: 3,
      name: "Document Parser",
      type: "agent",
      description: "Parse and extract document data",
    },
  ]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Template Library</h2>
          <p className="text-sm text-muted-foreground">
            Browse and use pre-built templates
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Template
        </Button>
      </div>

      <div className="flex space-x-4 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input className="pl-10" placeholder="Search templates..." />
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Templates</TabsTrigger>
          <TabsTrigger value="agents">Agents</TabsTrigger>
          <TabsTrigger value="workflows">Workflows</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid gap-4">
            {templates.map((template) => (
              <Card key={template.id}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    {template.type === "agent" ? (
                      <Bot className="h-5 w-5" />
                    ) : template.type === "workflow" ? (
                      <Code className="h-5 w-5" />
                    ) : (
                      <FileText className="h-5 w-5" />
                    )}
                    <span>{template.name}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {template.description}
                  </p>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      Preview
                    </Button>
                    <Button size="sm">Use Template</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="agents">{/* Agent templates */}</TabsContent>

        <TabsContent value="workflows">{/* Workflow templates */}</TabsContent>
      </Tabs>
    </div>
  );
}
