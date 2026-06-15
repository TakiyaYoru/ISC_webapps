import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

const isConfigured = 
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseAnonKey.includes('your_supabase_anon_key')

if (!isConfigured) {
  console.warn(
    'Supabase credentials are not fully configured. The app will fall back to local mock storage.'
  )
}

// Chainable mock client to prevent runtime crashes when offline/unconfigured
const dummyChain: any = {
  select: () => dummyChain,
  insert: () => dummyChain,
  update: () => dummyChain,
  delete: () => dummyChain,
  single: () => dummyChain,
  maybeSingle: () => dummyChain,
  order: () => dummyChain,
  limit: () => dummyChain,
  eq: () => dummyChain,
  then: (onfulfilled: any) => 
    onfulfilled({ data: null, error: { message: 'Supabase URL and Anon Key are not configured.' } })
}

export const supabase = isConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      from: () => dummyChain
    } as any

