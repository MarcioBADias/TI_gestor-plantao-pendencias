import React, { useState } from 'react'
import {
  CalendarContainer,
  CalendarHeader,
  CalendarGrid,
  Day,
  WeekDays,
  NavButton
} from './style'

const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

const Calendar = ({ onClickedDay }) => {
  const [currentDate, setCurrentDate] = useState(new Date())

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDayOfMonth = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1))
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1))
  };

  const generateDays = () => {
    const days = [];

  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} />)
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const selectedFullDate = new Date(year, month, day)
    days.push(
      <Day
        key={day}
        onClick={() => onClickedDay(selectedFullDate)}
      >
        {day}
        <p style={{ marginTop: 10 }}>
          Técnico de Plantão:
        </p>
        <span>
          <strong>Fulano</strong>
        </span>
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
            <span 
                key={day}
            >
                {day}
            </span>
        ))}
      </WeekDays>

      <CalendarGrid>{generateDays()}</CalendarGrid>
    </CalendarContainer>
  );
};

export { Calendar }
