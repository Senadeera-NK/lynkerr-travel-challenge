import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // This helper creates a Supabase client for use in the browser
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}