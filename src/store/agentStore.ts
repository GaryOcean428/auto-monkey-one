import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { z } from "zod";

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
  updateAgentStatus as updateAgentStatusAPI,
} from "../lib/agent";

interface AgentState {
  agents: Agent[];
  metrics: AgentMetrics;
  isLoading: boolean;
  error: string | null;
  createAgent: (agent: Omit<Agent, "id">) => Promise<void>;
  updateAgentStatus: (id: string, status: Agent["status"]) => Promise<void>;
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

export const useAgentStore = create<AgentState>((set) => ({
  agents: [],
  metrics: defaultMetrics,
  isLoading: false,
  error: null,

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
      set({ isLoading: true });
      await updateAgentStatusAPI(id, status);
      set((state) => ({
        agents: state.agents.map((agent) =>
          agent.id === id ? { ...agent, status } : agent,
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  updateMetrics: (newMetrics) =>
    set((state) => ({
      metrics: { ...state.metrics, ...newMetrics },
    })),
}));
