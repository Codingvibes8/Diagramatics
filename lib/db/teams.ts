import { createClient } from '@/lib/supabase/client'

export async function getTeams(userId: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('teams')
    .select('*')
    .eq('created_by', userId)
    .order('created_at', { ascending: false })

  return { data, error }
}

export async function createTeam(teamName: string) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { data: null, error: new Error('No authenticated user') }
  }

  const { data, error } = await supabase
    .from('teams')
    .insert({
      team_name: teamName,
      created_by: user.id
    })
    .select()
    .single()

  return { data, error }
}
