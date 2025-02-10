import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import DashboardHeader from "./DashboardHeader";
import AgentGrid from "./AgentGrid";
import MetricsPanel from "./MetricsPanel";
import CreateAgentModal from "./CreateAgentModal";
import { useAgentStore } from "@/store/agentStore";

const Home = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const { initialize, isLoading, error } = useAgentStore((state) => ({
    initialize: state.initialize,
    isLoading: state.isLoading,
    error: state.error,
  }));

  useEffect(() => {
    // Initialize agents
    initialize().catch(console.error);

    // Cleanup function using the cleanup utility
    return () => {
      cleanupIntervals();
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">Loading agents...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="rounded-lg bg-destructive/10 p-4 text-destructive">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-background">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader
          onSearch={(query) => console.log("Search:", query)}
          onFilter={(filter) => console.log("Filter:", filter)}
        />
        <div className="flex-1 overflow-auto p-6 space-y-6">
          <AgentGrid onCreateAgent={() => setCreateModalOpen(true)} />
          <MetricsPanel />
        </div>
      </div>
      <CreateAgentModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onSubmit={(data) => {
          console.log("Create agent:", data);
          setCreateModalOpen(false);
        }}
      />
    </div>
  );
};

export default Home;
