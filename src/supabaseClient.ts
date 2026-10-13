import { createClient } from '@supabase/supabase-js'
const url = import.meta.env.VITE_SUPABASE_URL || ''
const key = import.meta.env.VITE_SUPABASE_ANON_KEY || ''
// Auth uses a public key. Backend service-role secrets must never be used here.
export const supabase = url && key && !url.includes('your-project-id') && !key.includes('your-supabase')
  ? createClient(url, key)
  : null
