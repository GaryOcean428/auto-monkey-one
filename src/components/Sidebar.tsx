import { useState } from "react";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import {
  LayoutGrid,
  Settings,
  FileCode,
  Network,
  ChevronLeft,
  ChevronRight,
  Sliders,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import PreferencesPanel from "./settings/PreferencesPanel";
import SystemPanel from "./settings/SystemPanel";
import WorkflowBuilder from "./workflow/WorkflowBuilder";
import TemplateLibrary from "./templates/TemplateLibrary";
import { Dialog, DialogContent } from "./ui/dialog";

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
  className?: string;
}

const Sidebar = ({
  collapsed = false,
  onToggle = () => {},
  className = "",
}: SidebarProps) => {
  const [activePanel, setActivePanel] = useState<string | null>(null);

  const navItems = [
    { icon: LayoutGrid, label: "Templates", panel: "templates" },
    { icon: Network, label: "Workflow Builder", panel: "workflow" },
    { icon: Settings, label: "Settings", panel: "settings" },
    { icon: FileCode, label: "System", panel: "system" },
  ];

  const renderPanel = () => {
    switch (activePanel) {
      case "templates":
        return <TemplateLibrary />;
      case "workflow":
        return <WorkflowBuilder />;
      case "settings":
        return <PreferencesPanel />;
      case "system":
        return <SystemPanel />;
      case "preferences":
        return <PreferencesPanel />;
      default:
        return null;
    }
  };

  return (
    <>
      <div
        className={cn(
          "h-screen bg-background border-r border-border transition-all duration-300 flex flex-col",
          collapsed ? "w-16" : "w-[280px]",
          className,
        )}
      >
        <div className="p-4 border-b border-border flex items-center justify-between">
          {!collapsed && (
            <span className="text-xl font-semibold">Auto-Monkey AI</span>
          )}
          <Button
            variant="ghost"
            size="icon"
            className={cn("ml-auto")}
            onClick={onToggle}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <TooltipProvider key={item.label}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start",
                      collapsed ? "px-2" : "px-4",
                    )}
                    onClick={() => setActivePanel(item.panel)}
                  >
                    <item.icon className="h-5 w-5" />
                    {!collapsed && <span className="ml-3">{item.label}</span>}
                  </Button>
                </TooltipTrigger>
                {collapsed && (
                  <TooltipContent side="right">
                    <p>{item.label}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start",
                    collapsed ? "px-2" : "px-4",
                  )}
                  onClick={() => setActivePanel("preferences")}
                >
                  <Sliders className="h-5 w-5" />
                  {!collapsed && <span className="ml-3">Preferences</span>}
                </Button>
              </TooltipTrigger>
              {collapsed && (
                <TooltipContent side="right">
                  <p>Preferences</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <Dialog open={!!activePanel} onOpenChange={() => setActivePanel(null)}>
        <DialogContent className="max-w-4xl h-[80vh] overflow-y-auto">
          {renderPanel()}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Sidebar;
