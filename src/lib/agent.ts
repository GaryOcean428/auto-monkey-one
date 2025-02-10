import { supabase } from "./supabase";
import { Database } from "../types/supabase";
import { AgentStatus } from "@/types/agent";

export type AgentInstance =
  Database["public"]["Tables"]["agent_instances"]["Row"];
export type AgentMemory = Database["public"]["Tables"]["agent_memory"]["Row"];
export type Task = Database["public"]["Tables"]["task_queue"]["Row"];

// Simulated API calls for demo purposes
export async function createAgent(
  name: string,
  type: string,
): Promise<{ id: string }> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Return mock data
  return {
    id: Math.random().toString(36).substr(2, 9),
  };
}

export async function updateAgentStatusAPI(
  id: string,
  status: AgentStatus,
): Promise<void> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Simulate random failure
  if (Math.random() < 0.1) {
    throw new Error(`Failed to update agent ${id} status to ${status}`);
  }
}

export async function createTask(
  description: string,
  type: string,
  agentId?: string,
  priority: number = 1,
): Promise<Task> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Return mock data
  return {
    id: Math.random().toString(36).substr(2, 9),
    description,
    task_type: type,
    agent_id: agentId,
    priority,
    status: "pending",
    created_at: new Date().toISOString(),
  } as Task;
}

export async function storeMemory(
  agentId: string,
  content: string,
): Promise<void> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Simulate random failure
  if (Math.random() < 0.1) {
    throw new Error(`Failed to store memory for agent ${agentId}`);
  }
}
