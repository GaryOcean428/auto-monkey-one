import { serve } from "https://deno.fresh.dev/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Configuration, OpenAIApi } from "https://esm.sh/openai@3.2.1";
import { encode } from "https://esm.sh/gpt-3-encoder@1.1.4";

serve(async (req) => {
  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    );

    const { task_id, agent_id } = await req.json();

    // Get task details
    const { data: task, error: taskError } = await supabaseClient
      .from("task_queue")
      .select("*")
      .eq("id", task_id)
      .single();

    if (taskError) throw taskError;

    // Update task status to in_progress
    await supabaseClient
      .from("task_queue")
      .update({ status: "in_progress", started_at: new Date().toISOString() })
      .eq("id", task_id);

    // Initialize OpenAI
    const configuration = new Configuration({
      apiKey: Deno.env.get("OPENAI_API_KEY"),
    });
    const openai = new OpenAIApi(configuration);

    // Process task based on type
    let result;
    switch (task.task_type) {
      case "web_navigation":
        result = await handleWebNavigation(task, openai);
        break;
      case "document_processing":
        result = await handleDocumentProcessing(task, openai);
        break;
      default:
        throw new Error(`Unsupported task type: ${task.task_type}`);
    }

    // Update task with result
    await supabaseClient
      .from("task_queue")
      .update({
        status: "completed",
        completed_at: new Date().toISOString(),
        result,
      })
      .eq("id", task_id);

    return new Response(JSON.stringify({ success: true, result }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});

async function handleWebNavigation(task, openai) {
  // Implement web navigation logic
  return { status: "success", data: "Web navigation completed" };
}

async function handleDocumentProcessing(task, openai) {
  // Implement document processing logic
  return { status: "success", data: "Document processing completed" };
}
