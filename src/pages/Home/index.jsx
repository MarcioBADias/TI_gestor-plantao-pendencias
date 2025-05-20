import React from 'react'
import { FaCalendarDay } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { Container, IconButton } from './style'

const Home = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/calendar')
  }

  return (
    <Container>
      <IconButton onClick={handleClick} title="Ir para calendário">
        <FaCalendarDay />
        <p>Calendario de plantoes</p>
      </IconButton>
    </Container>
  )
}

export { Home }
