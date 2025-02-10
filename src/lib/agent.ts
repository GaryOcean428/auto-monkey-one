import { supabase } from "./supabase";
import { Database } from "../types/supabase";

export type AgentInstance =
  Database["public"]["Tables"]["agent_instances"]["Row"];
export type AgentMemory = Database["public"]["Tables"]["agent_memory"]["Row"];
export type Task = Database["public"]["Tables"]["task_queue"]["Row"];

export async function createAgent(
  name: string,
  type: Database["public"]["Enums"]["agent_type"],
) {
  const { data, error } = await supabase
    .from("agent_instances")
    .insert({
      name,
      agent_type: type,
      status: "idle",
      metadata: {
        created_at: new Date().toISOString(),
        memory_usage: 0,
        cpu_usage: 0,
      },
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateAgentStatus(id: string, status: string) {
  const { error } = await supabase
    .from("agent_instances")
    .update({ status })
    .eq("id", id);

  if (error) throw error;
}

export async function createTask(
  description: string,
  type: string,
  agentId?: string,
  priority: number = 1,
) {
  const { data, error } = await supabase
    .from("task_queue")
    .insert({
      description,
      task_type: type,
      agent_id: agentId,
      priority,
      status: "pending",
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function storeMemory(agentId: string, content: string) {
  const { error } = await supabase.from("agent_memory").insert({
    agent_id: agentId,
    content,
    metadata: {
      timestamp: new Date().toISOString(),
    },
  });

  if (error) throw error;
}
