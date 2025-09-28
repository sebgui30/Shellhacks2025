import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.58.0';

interface PushPayload {
  type: 'match' | 'message';
  recipientIds: string[];
  title: string;
  body: string;
  data?: Record<string, unknown>;
}

const EXPO_PUSH_URL = 'https://exp.host/--/api/v2/push/send';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
const EXPO_ACCESS_TOKEN = Deno.env.get('EXPO_ACCESS_TOKEN');

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('Missing Supabase service credentials in function environment.');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  let payload: PushPayload;
  try {
    payload = await req.json();
  } catch (_) {
    return new Response('Invalid JSON body', { status: 400 });
  }

  if (!payload.recipientIds?.length) {
    return new Response('recipientIds required', { status: 400 });
  }

  const { data: tokens, error } = await supabase
    .from('push_subscriptions')
    .select('expo_token')
    .in('user_id', payload.recipientIds)
    .eq('is_active', true);

  if (error) {
    console.error('Failed to fetch push tokens', error);
    return new Response('Failed to fetch push tokens', { status: 500 });
  }

  const chunks = chunk(tokens ?? [], 100); // Expo limit per request
  const results: Array<{ status: number; body: unknown }> = [];

  for (const chunkTokens of chunks) {
    if (!chunkTokens.length) continue;

    const body = JSON.stringify({
      to: chunkTokens.map((row) => row.expo_token),
      title: payload.title,
      body: payload.body,
      data: {
        type: payload.type,
        ...(payload.data ?? {}),
      },
    });

    const response = await fetch(EXPO_PUSH_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(EXPO_ACCESS_TOKEN ? { Authorization: `Bearer ${EXPO_ACCESS_TOKEN}` } : {}),
      },
      body,
    });

    results.push({
      status: response.status,
      body: await response.json(),
    });
  }

  return new Response(JSON.stringify({ results }), {
    headers: { 'Content-Type': 'application/json' },
  });
});

function chunk<T>(array: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}