import React, { useEffect, useState } from 'react'
import {
  CalendarContainer,
  CalendarHeader,
  CalendarGrid,
  Day,
  WeekDays,
  NavButton
} from './style'
import { FiEdit3 } from 'react-icons/fi'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://uhxambgdjkmdgoarezto.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVoeGFtYmdkamttZGdvYXJlenRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2MjM2OTksImV4cCI6MjA1OTE5OTY5OX0.eWbosa73xQPofo4_nantz5gKlLPRFuiYBRcIu0fZTMg'
const supabase = createClient(supabaseUrl, supabaseKey)

const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

const Calendar = ({ onClickedDay }) => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [techPerDay, setTechPerDay] = useState({})
  const [editingDate, setEditingDate] = useState(null)
  const [technicians, setTechnicians] = useState([])


  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const firstDayOfMonth = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const prevMonth = () => setCurrentDate(new Date(year, month - 1))
  const nextMonth = () => setCurrentDate(new Date(year, month + 1))

  useEffect(() => {
    const fetchTechnicians = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('id, display_name')
  
      if (error) {
        console.error('Erro ao buscar técnicos:', error.message)
        return
      }
  
      setTechnicians(data)
      console.log('Usuários retornados:', data)

    }
  
    fetchTechnicians()
  }, [])
  

  // 🔽 Buscar dados do Supabase ao montar componente
  useEffect(() => {
    const fetchPlantaoData = async () => {
      const startOfMonth = new Date(year, month, 1).toISOString().split('T')[0]
      const endOfMonth = new Date(year, month + 1, 0).toISOString().split('T')[0]

      const { data, error } = await supabase
        .from('plantoes')
        .select('id, data, id_tecnico')
        .gte('data', startOfMonth)
        .lte('data', endOfMonth)

      if (error) {
        console.error('Erro ao buscar dados do Supabase:', error.message)
        return
      }

      const formatted = {}
      data.forEach(item => {
        formatted[item.data] = item.tecnico
      })

      setTechPerDay(formatted)
    }

    fetchPlantaoData()
  }, [currentDate])

  // 🔼 Salvar alteração no Supabase
  const handleTechChange = async (dateKey, technician) => {
    // const { data, error } = await supabase
    //   .from('plantoes')
    //   .upsert([
    //     { data: dateKey, id_tecnico: technician }
    //   ], { onConflict: ['data'] })

    // if (error) {
    //   console.error('Erro ao salvar técnico:', error.message)
    //   return
    // }

    setTechPerDay(prev => ({
      ...prev,
      [dateKey]: technician
    }))
    setEditingDate(null)
  }

  const generateDays = () => {
    const days = []

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} />)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const selectedFullDate = new Date(year, month, day)
      const dateKey = selectedFullDate.toISOString().split('T')[0]
      const currentTechId = techPerDay[dateKey]
      const currentTech = technicians.find(tech => tech.id === currentTechId)?.display_name || 'Fulano'

      const isEditing = editingDate === dateKey

      days.push(
        <Day key={dateKey} onClick={() => onClickedDay(selectedFullDate)}>
          {day}
          <p style={{ marginTop: 10 }}>Técnico de Plantão:</p>
          {isEditing ? (
            <select
            value={currentTechId || ''}
            onChange={(e) => handleTechChange(dateKey, e.target.value)}
            onClick={(e) => e.stopPropagation()}
          >
            <option value="Fulano" disabled>Selecione</option>
            {technicians.map(tech => (
              <option key={tech.id} value={tech.id}>{tech.display_name}</option>
            ))}
            </select>
          
          ) : (
            <>
              <span><strong>{currentTech}</strong></span>
              <FiEdit3
                style={{ cursor: 'pointer', marginLeft: 8 }}
                onClick={(e) => {
                  e.stopPropagation()
                  setEditingDate(dateKey)
                }}
              />
            </>
          )}
        </Day>
      )
    }

    return days
  }

  return (
    <CalendarContainer>
      <CalendarHeader>
        <NavButton onClick={prevMonth}>←</NavButton>
        <h2>{currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}</h2>
        <NavButton onClick={nextMonth}>→</NavButton>
      </CalendarHeader>

      <WeekDays>
        {daysOfWeek.map(day => <span key={day}>{day}</span>)}
      </WeekDays>

      <CalendarGrid>{generateDays()}</CalendarGrid>
    </CalendarContainer>
  )
}

export { Calendar }
