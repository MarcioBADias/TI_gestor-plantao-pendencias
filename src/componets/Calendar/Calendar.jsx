import React, { useEffect, useState } from 'react'
import {
  CalendarContainer,
  CalendarHeader,
  CalendarGrid,
  Day,
  WeekDays,
  NavButton,
} from './style'
import { FiEdit3, FiCheckSquare } from 'react-icons/fi'
import { supabase } from '../../supabaseClient'

const daysOfWeek = [ 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom' ]

const Calendar = ({ onClickedDay, isAdmin }) => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [techPerDay, setTechPerDay] = useState({})
  const [editingDate, setEditingDate] = useState(null)
  const [technicians, setTechnicians] = useState([])
  const [checkedField, setCheckedField] = useState([])

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const getAdjustedFirstDayOfMonth = () => {
    const firstDay = new Date(year, month, 1).getDay() 
    return firstDay === 0 ? 6 : firstDay - 1 
  }
  
  const firstDayOfMonth = getAdjustedFirstDayOfMonth()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const prevMonth = () => setCurrentDate(new Date(year, month - 1))
  const nextMonth = () => setCurrentDate(new Date(year, month + 1))

  useEffect(() => {
    const fetchTechnicians = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('id, display_name, adm')

      if (error) {
        console.error('Erro ao buscar técnicos:', error.message)
        return
      }

      setTechnicians(data)
    }

    fetchTechnicians()
    console.log(technicians)
  }, [])

  const fetchPlantaoData = async () => {
    const startOfMonth = new Date(year, month, 1).toISOString().split('T')[0]
    const endOfMonth = new Date(year, month + 1, 0).toISOString().split('T')[0]

    const { data, error } = await supabase
      .from('plantoes')
      .select('id, data, id_tecnico, checked')
      .gte('data', startOfMonth)
      .lte('data', endOfMonth)

    if (error) {
      console.error('Erro ao buscar dados do Supabase:', error.message)
      return
    }

    const formatted = {}
    data.forEach((item) => {
      formatted[item.data] = {
        id_tech: item.id_tecnico,
        checked: item.checked,
      }
    })

    setTechPerDay(formatted)
  }

  useEffect(() => {
    fetchPlantaoData()
  }, [currentDate])

  const handleTechChange = async (dateKey, technician) => {
    const { error } = await supabase
      .from('plantoes')
      .upsert([{ data: dateKey, id_tecnico: technician }], {
        onConflict: ['data'],
      })

    if (error) {
      console.error('Erro ao salvar técnico:', error.message)
      return
    }

    await fetchPlantaoData()
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
      const dayData = techPerDay[dateKey] || {}
      const currentTechId = techPerDay[dateKey]?.id_tech
      const currentTech =
        technicians.find((tech) => tech.id === dayData.id_tech)?.display_name ||
        'Selecione um técnico'
      const isEditing = editingDate === dateKey
      const isChecked = dayData.checked === true

      days.push(
        <Day
          key={dateKey}
          isActive={checkedField}
          hasTech={isChecked}
          onClick={() =>
            onClickedDay({
              currentDate: selectedFullDate,
              technician: currentTech,
            })
          }
        >
          {day}
          <p style={{ marginTop: 10 }}>Técnico de Plantão:</p>
          {isEditing && isAdmin ? (
            <select
              value={currentTechId || ''}
              onChange={(e) => handleTechChange(dateKey, e.target.value)}
              onClick={(e) => e.stopPropagation()}
            >
              <option value="" disabled>
                Selecione
              </option>
              {technicians.map((tech) => (
                <option key={tech.id} value={tech.id}>
                  {tech.display_name}
                </option>
              ))}
            </select>
          ) : (
            <>
              <span>
                <strong>{currentTech}</strong>
              </span>
<<<<<<< HEAD
              {technicians.adm && (
                <FiEdit3
                  style={{ cursor: 'pointer', marginLeft: 8 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    setEditingDate(dateKey)
                  }}
                />
              )}
              <p>
                <FiCheckSquare
                  style={{
                    cursor: isChecked ? 'default' : 'pointer',
                  }}
                  onClick={async (e) => {
                    e.stopPropagation()
=======
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                {isAdmin && (
                  <FiEdit3
                    style={{ cursor: 'pointer', marginLeft: 8 }}
                    onClick={(e) => {
                      e.stopPropagation()
                      setEditingDate(dateKey)
                    }}
                  />
                )}
                <p>
                  <FiCheckSquare
                    style={{
                      cursor: isChecked ? 'default' : 'pointer',
                    }}
                    onClick={async (e) => {
                      e.stopPropagation()
>>>>>>> dev

                      const { error } = await supabase.from('plantoes').upsert(
                        [
                          {
                            data: dateKey,
                            id_tecnico: currentTechId || null,
                            checked: !isChecked,
                          },
                        ],
                        {
                          onConflict: ['data'],
                        },
                      )

                      if (error) {
                        console.error(
                          'Erro ao atualizar checked:',
                          error.message,
                        )
                        return
                      }

                      await fetchPlantaoData()
                    }}
                  />
                </p>
              </div>
            </>
          )}
        </Day>,
      )
    }

    return days
  }

  return (
    <CalendarContainer>
      <CalendarHeader>
        <NavButton onClick={prevMonth}>←</NavButton>
        <h2>
          {currentDate.toLocaleDateString('pt-BR', {
            month: 'long',
            year: 'numeric',
          })}
        </h2>
        <NavButton onClick={nextMonth}>→</NavButton>
      </CalendarHeader>

      <WeekDays>
        {daysOfWeek.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </WeekDays>

      <CalendarGrid>{generateDays()}</CalendarGrid>
    </CalendarContainer>
  )
}

export { Calendar }
