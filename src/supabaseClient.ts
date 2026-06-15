import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey || supabaseAnonKey.includes('your_supabase_anon_key')) {
  console.warn(
    'Supabase credentials are not fully configured. Please configure them in your .env file.'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
