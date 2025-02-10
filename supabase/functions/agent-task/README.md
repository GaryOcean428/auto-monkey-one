# Agent Task Handler Edge Function

This edge function handles agent task execution and management.

## Deployment

```bash
supabase functions deploy agent-task
```

## Environment Variables Required

- OPENAI_API_KEY
- SUPABASE_URL
- SUPABASE_ANON_KEY

## Usage

Endpoint: POST /functions/v1/agent-task

Payload:
```json
{
  "task_id": "uuid",
  "agent_id": "uuid"
}
```
