import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

const useSupabaseReports = () => {
  const [relatorios, setRelatorios] = useState([])

  useEffect(() => {
    const fetchReports = async () => {
      const { data, error } = await supabase
        .from('atendimento')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Erro ao buscar atendimentos:', error.message)
      } else {
        setRelatorios(data)
      }
    }

    fetchReports()
  }, [])

  const deleteReport = async (id) => {
    const { error } = await supabase.from('atendimento').delete().match({ id })

    if (error) {
      console.error('Erro ao excluir o relatório:', error.message)
    } else {
      setRelatorios((prevRelatorios) =>
        prevRelatorios.filter((relatorio) => relatorio.id !== id),
      )
      console.log('Relatório excluído com sucesso.')
    }
  }

  const addReport = async (newReport) => {
    const { data, error } = await supabase
      .from('atendimento')
      .insert([newReport])

    if (error) {
      console.error('Erro ao salvar no Supabase:', error.message)
    } else {
      console.log('Salvo com sucesso:', data)
      setRelatorios([...relatorios, newReport])
    }
  }

  return { relatorios, deleteReport, addReport }
}

export { useSupabaseReports }
