import React, { useState } from 'react'
import {
  CalendarContainer,
  CalendarHeader,
  CalendarGrid,
  Day,
  WeekDays,
  NavButton
} from './style'
import { FiEdit3 } from 'react-icons/fi'

const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
const technicians = ['Adriano', 'João', 'Marcio', 'Yago']

const Calendar = ({ onClickedDay }) => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [techPerDay, setTechPerDay] = useState({})
  const [editingDate, setEditingDate] = useState(null)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDayOfMonth = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1))
  }

  const handleTechChange = (dateKey, technician) => {
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
      const currentTech = techPerDay[dateKey] || 'Selecione um técnico'
      const isEditing = editingDate === dateKey

      days.push(
        <Day key={day} onClick={() => onClickedDay(selectedFullDate)}>
          {day}

          <p style={{ marginTop: 10 }}>
            Técnico de Plantão:
          </p>

          {isEditing ? (
            <select
              value={currentTech}
              onChange={(e) => handleTechChange(dateKey, e.target.value)}
              onClick={(e) => e.stopPropagation()}
            >
              <option value="Selecione um técnico" disabled>Selecione</option>
              {technicians.map(name => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          ) : (
            <>
              <span>
                <strong>{currentTech}</strong>
              </span>
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
        {daysOfWeek.map(day => (
          <span key={day}>{day}</span>
        ))}
      </WeekDays>

      <CalendarGrid>{generateDays()}</CalendarGrid>
    </CalendarContainer>
  )
}

export { Calendar }
