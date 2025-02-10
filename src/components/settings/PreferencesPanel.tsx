import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Monitor } from "lucide-react";

export default function PreferencesPanel() {
  const [theme, setTheme] = useState("dark");
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Theme</Label>
            <div className="flex items-center space-x-2">
              <Button
                variant={theme === "light" ? "default" : "outline"}
                size="icon"
                onClick={() => setTheme("light")}
              >
                <Sun className="h-4 w-4" />
              </Button>
              <Button
                variant={theme === "dark" ? "default" : "outline"}
                size="icon"
                onClick={() => setTheme("dark")}
              >
                <Moon className="h-4 w-4" />
              </Button>
              <Button
                variant={theme === "system" ? "default" : "outline"}
                size="icon"
                onClick={() => setTheme("system")}
              >
                <Monitor className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Enable Notifications</Label>
            <Switch
              checked={notifications}
              onCheckedChange={setNotifications}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Editor</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Auto Save</Label>
            <Switch checked={autoSave} onCheckedChange={setAutoSave} />
          </div>
          <div className="space-y-2">
            <Label>Font Size</Label>
            <Select defaultValue="14">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="12">12px</SelectItem>
                <SelectItem value="14">14px</SelectItem>
                <SelectItem value="16">16px</SelectItem>
                <SelectItem value="18">18px</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
