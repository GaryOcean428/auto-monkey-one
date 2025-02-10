import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { z } from "zod";
import type { Agent, AgentMetrics, AgentStatus } from "@/types/agent";

const AgentSchema = z.object({
  id: z.string(),
  name: z.string(),
  status: z.enum(["running", "paused", "stopped"]),
  memoryUsage: z.number().min(0).max(100),
  cpuUsage: z.number().min(0).max(100),
  taskProgress: z.number().min(0).max(100),
  currentTask: z.string(),
});

const MetricsSchema = z.object({
  efficiency: z.number().min(0).max(100),
  completionRate: z.number().min(0).max(100),
  resourceUtilization: z.number().min(0).max(100),
  dailyTasks: z.array(
    z.object({
      date: z.string(),
      completed: z.number(),
      total: z.number(),
    }),
  ),
  resourceHistory: z.array(
    z.object({
      timestamp: z.string(),
      cpu: z.number().min(0).max(100),
      memory: z.number().min(0).max(100),
    }),
  ),
});
import { Agent, AgentMetrics } from "../types/agent";
import {
  createAgent as createAgentAPI,
  updateAgentStatusAPI,
} from "../lib/agent";

interface AgentState {
  agents: Agent[];
  metrics: AgentMetrics;
  isLoading: boolean;
  error: string | null;
  initialized: boolean;
  initialize: () => Promise<void>;
  createAgent: (agent: Omit<Agent, "id">) => Promise<void>;
  updateAgentStatus: (id: string, status: Agent["status"]) => Promise<void>;
  restartAgent: (id: string) => Promise<void>;
  updateMetrics: (metrics: Partial<AgentMetrics>) => void;
}

const defaultMetrics: AgentMetrics = {
  efficiency: 85,
  completionRate: 92,
  resourceUtilization: 78,
  dailyTasks: [
    { date: "2024-03-01", completed: 45, total: 50 },
    { date: "2024-03-02", completed: 38, total: 40 },
    { date: "2024-03-03", completed: 42, total: 45 },
  ],
  resourceHistory: [
    { timestamp: "09:00", cpu: 65, memory: 70 },
    { timestamp: "10:00", cpu: 75, memory: 80 },
    { timestamp: "11:00", cpu: 70, memory: 75 },
  ],
};

export const useAgentStore = create<AgentState>((set, get) => ({
  agents: [],
  metrics: defaultMetrics,
  isLoading: false,
  error: null,
  initialized: false,

  initialize: async () => {
    // Return early if already initialized
    if (get().initialized) {
      set({ isLoading: false });
      return;
    }

    try {
      set({ isLoading: true, error: null });

      // Initialize with default agents immediately
      const defaultAgents = [
        {
          id: "1",
          name: "Data Processor",
          status: "running",
          memoryUsage: 45,
          cpuUsage: 32,
          taskProgress: 67,
          currentTask: "Processing data streams",
        },
        {
          id: "2",
          name: "Web Scraper",
          status: "paused",
          memoryUsage: 28,
          cpuUsage: 15,
          taskProgress: 89,
          currentTask: "Analyzing web content",
        },
      ];

      set({ agents: defaultAgents, initialized: true, isLoading: false });

      // Start periodic metrics updates
      const intervalId = setInterval(() => {
        const { agents } = get();
        if (!agents.length) return; // Guard against empty agents

        const updatedAgents = agents.map((agent) => ({
          ...agent,
          memoryUsage: Math.min(
            100,
            agent.memoryUsage + (Math.random() * 10 - 5),
          ),
          cpuUsage: Math.min(100, agent.cpuUsage + (Math.random() * 10 - 5)),
          taskProgress: Math.min(100, agent.taskProgress + Math.random() * 5),
        }));
        set({ agents: updatedAgents });
      }, 5000);

      // Store interval ID for cleanup
      (window as any).__agentUpdateInterval = intervalId;
    } catch (error) {
      set({
        error: error.message || "Failed to initialize agents",
        initialized: true,
        isLoading: false,
      });
    }
  },

  createAgent: async (newAgent) => {
    try {
      set({ isLoading: true });
      const agent = await createAgentAPI(newAgent.name, "web_navigation");
      set((state) => ({
        agents: [...state.agents, { ...newAgent, id: agent.id }],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  updateAgentStatus: async (id, status) => {
    try {
      set({ isLoading: true, error: null });
      await updateAgentStatusAPI(id, status);
      set((state) => ({
        agents: state.agents.map((agent) =>
          agent.id === id ? { ...agent, status } : agent,
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw new Error(
        error.message ||
          `Failed to ${status === "running" ? "pause" : "start"} agent`,
      );
    }
  },

  restartAgent: async (id) => {
    try {
      set({ isLoading: true, error: null });
      // Stop the agent
      await updateAgentStatusAPI(id, "stopped");
      set((state) => ({
        agents: state.agents.map((agent) =>
          agent.id === id
            ? {
                ...agent,
                status: "stopped",
                taskProgress: 0,
                currentTask: "Restarting...",
              }
            : agent,
        ),
      }));

      // Small delay to simulate shutdown
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Start the agent
      await updateAgentStatusAPI(id, "running");
      set((state) => ({
        agents: state.agents.map((agent) =>
          agent.id === id
            ? { ...agent, status: "running", memoryUsage: 0, cpuUsage: 0 }
            : agent,
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw new Error(error.message || "Failed to restart agent");
    }
  },

  updateMetrics: (newMetrics) =>
    set((state) => ({
      metrics: { ...state.metrics, ...newMetrics },
    })),
}));
