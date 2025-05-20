import React from 'react'
import { BsKanbanFill } from 'react-icons/bs'
import {
  FaCalendarDay,
  FaClipboardList,
  FaCloudDownloadAlt,
  FaInfoCircle,
} from 'react-icons/fa'
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
        <IconButton onClick={handleClick}>
          <FaCalendarDay />
          <Title>Calendario de plantoes</Title>
        </IconButton>
      </IconConted>
      <IconConted>
        <IconButton>
          <FaClipboardList />
          <Title>Lista de clientes CLTRON</Title>
        </IconButton>
      </IconConted>
      <IconConted>
        <IconButton>
          <BsKanbanFill />
          <Title>Sistema de implantacoes</Title>
        </IconButton>
      </IconConted>
      <IconConted>
        <IconButton>
          <FaCloudDownloadAlt />
          <Title>Ferramentas e App</Title>
        </IconButton>
      </IconConted>
      <IconConted>
        <IconButton>
          <FaInfoCircle />
          <Title>Info uteis</Title>
        </IconButton>
      </IconConted>
    </Container>
  )
}

export { Home }
