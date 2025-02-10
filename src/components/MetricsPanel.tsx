import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

import { useAgentStore } from "../store/agentStore";

const MetricsPanel = () => {
  const metrics = useAgentStore((state) => state.metrics);
  const {
    efficiency,
    completionRate,
    resourceUtilization,
    dailyTasks,
    resourceHistory,
  } = metrics;
  return (
    <div className="w-full space-y-4 bg-background p-4 rounded-lg border border-border">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Performance Metrics</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Efficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold">{efficiency}%</div>
              <Progress value={efficiency} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Task Completion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold">{completionRate}%</div>
              <Progress value={completionRate} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Resource Utilization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold">{resourceUtilization}%</div>
              <Progress value={resourceUtilization} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="tasks" className="w-full">
        <TabsList>
          <TabsTrigger value="tasks">Daily Tasks</TabsTrigger>
          <TabsTrigger value="resources">Resource Usage</TabsTrigger>
        </TabsList>
        <TabsContent value="tasks" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {dailyTasks.map((day) => (
                  <div
                    key={day.date}
                    className="flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">{day.date}</span>
                        <span className="text-sm text-muted-foreground">
                          {day.completed}/{day.total} tasks
                        </span>
                      </div>
                      <Progress
                        value={(day.completed / day.total) * 100}
                        className="h-2"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="resources" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {resourceHistory.map((point) => (
                  <div key={point.timestamp} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{point.timestamp}</span>
                      <span className="text-muted-foreground">
                        CPU: {point.cpu}% | Memory: {point.memory}%
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Progress value={point.cpu} className="h-2" />
                      <Progress value={point.memory} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MetricsPanel;
