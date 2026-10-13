import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createInstagramFeedHandler } from '../_shared/instagram-feed.ts'

Deno.serve(createInstagramFeedHandler({
  accessToken: Deno.env.get('INSTAGRAM_ACCESS_TOKEN'),
  userId: Deno.env.get('INSTAGRAM_USER_ID'),
  apiVersion: Deno.env.get('INSTAGRAM_GRAPH_VERSION'),
  allowedOrigins: (Deno.env.get('INSTAGRAM_ALLOWED_ORIGINS') ?? 'https://imperialskincare.vn,https://www.imperialskincare.vn')
    .split(',').map(origin => origin.trim()).filter(Boolean),
}))
