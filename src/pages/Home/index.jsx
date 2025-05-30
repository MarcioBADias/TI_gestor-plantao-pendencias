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

  const handleClick = (path) => {
    navigate(path)
  }

  return (
    <Container>
      <IconConted>
        <IconButton onClick={() => handleClick('/calendar')}>
          <FaCalendarDay />
          <Title>Calendario de plantoes</Title>
        </IconButton>
      </IconConted>
      <IconConted>
        <IconButton>
          <a
          href='https://www.appsheet.com/start/cf33a55a-7f0e-4a79-a096-b8cbae15c502'
          target="_blank"
        >
          <FaClipboardList />
            </a>
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
