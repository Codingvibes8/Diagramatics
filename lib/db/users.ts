import { createClient } from '@/lib/supabase/client'

export async function getUser(email: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single()

  return { data, error }
}

export async function createUserProfile(user: { name: string; email: string; image: string }) {
  const supabase = createClient()
  const { data: { user: authUser } } = await supabase.auth.getUser()

  if (!authUser) {
    return { data: null, error: new Error('No authenticated user') }
  }

  const { data, error } = await supabase
    .from('users')
    .insert({
      id: authUser.id,
      ...user
    })
    .select()
    .single()

  return { data, error }
}

export async function upsertUserProfile(user: { name: string; email: string; image: string }) {
  const supabase = createClient()
  const { data: { user: authUser } } = await supabase.auth.getUser()

  if (!authUser) {
    return { data: null, error: new Error('No authenticated user') }
  }

  const { data, error } = await supabase
    .from('users')
    .upsert({
      id: authUser.id,
      ...user
    })
    .select()
    .single()

  return { data, error }
}
