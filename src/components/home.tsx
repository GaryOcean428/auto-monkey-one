import React, { useState } from "react";
import Sidebar from "./Sidebar";
import DashboardHeader from "./DashboardHeader";
import AgentGrid from "./AgentGrid";
import MetricsPanel from "./MetricsPanel";
import CreateAgentModal from "./CreateAgentModal";

const Home = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);

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
