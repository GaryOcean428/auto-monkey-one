import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { RefreshCw, Database, HardDrive, Cpu } from "lucide-react";

export default function SystemPanel() {
  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>System Resources</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Memory Usage</span>
              <span>65%</span>
            </div>
            <Progress value={65} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">CPU Usage</span>
              <span>45%</span>
            </div>
            <Progress value={45} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Storage</span>
              <span>80%</span>
            </div>
            <Progress value={80} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>System Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="w-full">
              <Database className="mr-2 h-4 w-4" />
              Database
            </Button>
            <Button variant="outline" className="w-full">
              <HardDrive className="mr-2 h-4 w-4" />
              Storage
            </Button>
            <Button variant="outline" className="w-full">
              <Cpu className="mr-2 h-4 w-4" />
              Processing
            </Button>
            <Button variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" />
              Updates
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
