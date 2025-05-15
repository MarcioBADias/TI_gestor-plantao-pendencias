import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://uhxambgdjkmdgoarezto.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVoeGFtYmdkamttZGdvYXJlenRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2MjM2OTksImV4cCI6MjA1OTE5OTY5OX0.eWbosa73xQPofo4_nantz5gKlLPRFuiYBRcIu0fZTMg'
const supabase = createClient(supabaseUrl, supabaseKey)

const useSupabaseAuth = () => {
  const [currentUser, setCurrentUser] = useState(null)

  const register = async ({ email, password, display_name }) => {
    const { data, error } = await supabase.from('users').insert([
      {
        email,
        password,
        display_name,
        ativo: true,
        plantonista_semana: true,
        plantonista_fim_semana: true,
        adm: false,
      },
    ])

    if (error) {
      console.error('Erro ao cadastrar:', error.message)
      return { error }
    }

    return { data }
  }

  const login = async ({ email, password }) => {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()

    if (error || !user) {
      return { error: 'Usuário não encontrado' }
    }

    if (password !== user.password) {
      return { error: 'Senha incorreta' }
    }

    setCurrentUser(user)
    return { data: user }
  }

  return { register, login, session: currentUser }
}

export { useSupabaseAuth }
