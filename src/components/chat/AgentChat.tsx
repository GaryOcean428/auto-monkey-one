import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot, Send, User, Workflow, Code, Database } from "lucide-react";
import { aiConfig } from "@/lib/ai-config";

interface Message {
  id: string;
  content: string;
  sender: "user" | "agent";
  timestamp: Date;
  metadata?: {
    workflow?: any;
    agentConfig?: any;
    model?: string;
    confidence?: number;
  };
}

const workflowSuggestions = [
  "Create a web scraping workflow",
  "Build a data processing pipeline",
  "Set up a document analysis workflow",
  "Design a content moderation system",
];

export default function AgentChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  const analyzeIntent = async (input: string) => {
    // Simulate AI analysis
    const complexity = input.length / 100; // Simple complexity heuristic
    let model = aiConfig.models.fast;

    if (complexity > aiConfig.modelSelection.complexityThreshold) {
      model =
        complexity > aiConfig.modelSelection.securityThreshold
          ? aiConfig.models.reasoning
          : aiConfig.models.reasoningLatest;
    }

    return {
      model,
      confidence: 0.8 + Math.random() * 0.2,
      workflow: {
        nodes: [
          {
            type: "agent",
            label: "Web Scraper",
            description: "Scrapes web content",
          },
          {
            type: "processor",
            label: "Data Processor",
            description: "Processes data",
          },
          { type: "data", label: "Storage", description: "Stores results" },
        ],
        edges: [
          { source: "1", target: "2" },
          { source: "2", target: "3" },
        ],
      },
    };
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Math.random().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInput("");
    setIsThinking(true);

    // Analyze intent and select model
    const analysis = await analyzeIntent(input);

    // Simulate agent response
    setTimeout(() => {
      const agentResponse: Message = {
        id: Math.random().toString(),
        content:
          "I'll help you create a workflow for that. I've analyzed your requirements and prepared a suggested workflow structure.",
        sender: "agent",
        timestamp: new Date(),
        metadata: {
          workflow: analysis.workflow,
          model: analysis.model,
          confidence: analysis.confidence,
        },
      };
      setMessages((prev) => [...prev, agentResponse]);
      setIsThinking(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          Agent Chat
        </CardTitle>
      </CardHeader>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-muted-foreground text-sm">
              <p className="mb-4">Try asking me to:</p>
              <div className="space-y-2">
                {workflowSuggestions.map((suggestion, i) => (
                  <Button
                    key={i}
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => {
                      setInput(suggestion);
                      handleSend();
                    }}
                  >
                    <Workflow className="h-4 w-4 mr-2" />
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          )}
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.sender === "agent" && (
                <Avatar>
                  <AvatarImage src="https://api.dicebear.com/7.x/bottts/svg?seed=agent" />
                  <AvatarFallback>
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={`rounded-lg p-3 max-w-[80%] ${message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
              >
                <p className="text-sm">{message.content}</p>
                {message.metadata?.workflow && (
                  <div className="mt-2 space-y-2">
                    {message.metadata.model && (
                      <p className="text-xs text-muted-foreground">
                        Analyzed using {message.metadata.model}
                        (Confidence:{" "}
                        {(message.metadata.confidence * 100).toFixed(1)}%)
                      </p>
                    )}
                    <div className="space-y-1">
                      {message.metadata.workflow.nodes.map(
                        (node: any, i: number) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 text-xs"
                          >
                            {node.type === "agent" ? (
                              <Bot className="h-3 w-3" />
                            ) : node.type === "processor" ? (
                              <Code className="h-3 w-3" />
                            ) : (
                              <Database className="h-3 w-3" />
                            )}
                            {node.label}
                          </div>
                        ),
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() =>
                        console.log(
                          "Create workflow",
                          message.metadata?.workflow,
                        )
                      }
                    >
                      <Workflow className="h-4 w-4 mr-2" />
                      Create Workflow
                    </Button>
                  </div>
                )}
              </div>
              {message.sender === "user" && (
                <Avatar>
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isThinking && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Bot className="h-4 w-4 animate-spin" />
              <span className="text-sm">
                Analyzing and designing workflow...
              </span>
            </div>
          )}
        </div>
      </ScrollArea>

      <Card className="m-4 mt-0">
        <CardContent className="p-2">
          <div className="flex gap-2">
            <Input
              placeholder="Describe your workflow or ask about agents..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
            />
            <Button onClick={handleSend} disabled={isThinking}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
