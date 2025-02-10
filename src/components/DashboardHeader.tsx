import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search, Filter, Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface DashboardHeaderProps {
  onSearch?: (query: string) => void;
  onFilter?: (filter: string) => void;
  notifications?: Array<{ id: string; message: string }>;
}

const DashboardHeader = ({
  onSearch = () => {},
  onFilter = () => {},
  notifications = [
    { id: "1", message: "Agent Alpha completed task" },
    { id: "2", message: "Agent Beta requires attention" },
    { id: "3", message: "System update available" },
  ],
}: DashboardHeaderProps) => {
  return (
    <div className="w-full h-20 px-6 bg-background border-b border-border flex items-center justify-between">
      <div className="flex items-center space-x-4 flex-1 max-w-xl">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search agents..."
            className="pl-10"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => onFilter("status")}>
              By Status
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onFilter("type")}>
              By Type
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onFilter("project")}>
              By Project
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center space-x-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {notifications.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {notifications.length}
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  {notifications.map((notification) => (
                    <DropdownMenuItem key={notification.id}>
                      {notification.message}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </TooltipTrigger>
            <TooltipContent>
              <p>Notifications</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default DashboardHeader;
