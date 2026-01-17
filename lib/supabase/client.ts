import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'

let browserClient: ReturnType<typeof createBrowserClient> | undefined

export function createClient() {
  if (typeof window !== 'undefined' && browserClient) {
    return browserClient
  }

  const client = createBrowserClient(supabaseUrl, supabaseKey)

  if (typeof window !== 'undefined') {
    browserClient = client
  }

  return client
}
