import React from 'react'
import { FaCalendarDay } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { Container, IconButton, IconConted, Title } from './style'

const Home = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/calendar')
  }

  return (
    <Container>
      <IconConted>
        <IconButton onClick={handleClick} title="Ir para calendário">
          <FaCalendarDay />
          <Title>Calendario de plantoes</Title>
        </IconButton>
      </IconConted>
      <IconConted>
        <IconButton onClick={handleClick} title="Ir para calendário">
          <FaCalendarDay />
          <Title>Calendario de plantoes</Title>
        </IconButton>
      </IconConted>
      <IconConted>
        <IconButton onClick={handleClick} title="Ir para calendário">
          <FaCalendarDay />
          <Title>Calendario de plantoes</Title>
        </IconButton>
      </IconConted>
      <IconConted>
        <IconButton onClick={handleClick} title="Ir para calendário">
          <FaCalendarDay />
          <Title>Calendario de plantoes</Title>
        </IconButton>
      </IconConted>
      <IconConted>
        <IconButton onClick={handleClick} title="Ir para calendário">
          <FaCalendarDay />
          <Title>Calendario de plantoes</Title>
        </IconButton>
      </IconConted>
    </Container>
  )
}

export { Home }
