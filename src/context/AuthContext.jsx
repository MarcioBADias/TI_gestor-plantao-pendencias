import React, { createContext, useContext, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://uhxambgdjkmdgoarezto.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVoeGFtYmdkamttZGdvYXJlenRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2MjM2OTksImV4cCI6MjA1OTE5OTY5OX0.eWbosa73xQPofo4_nantz5gKlLPRFuiYBRcIu0fZTMg'
const supabase = createClient(supabaseUrl, supabaseKey)

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user')
    return saved ? JSON.parse(saved) : null
  })

  const login = async ({ email, password }) => {
    const { data: foundUser, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()

    if (error || !foundUser) return { error: 'Usuário não encontrado' }

    if (password !== foundUser.password) return { error: 'Senha incorreta' }

    setUser(foundUser)
    localStorage.setItem('user', JSON.stringify(foundUser))
    return { data: foundUser }
  }

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

    if (error) return { error }

    return await login({ email, password })
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
