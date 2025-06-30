import { useNavigate } from 'react-router-dom'
import { Calendar } from '../../componets/Calendar/Calendar'

const CalendarPage = ({ setSelectedDay, setSelectTech, isAdmin }) => {
  const navigate = useNavigate()

  const handleClick = ({ currentDate, technician }) => {
    setSelectedDay(currentDate)
    setSelectTech(technician)
    navigate('/incident-sheet')
  }

  return <Calendar onClickedDay={handleClick} isAdmin={isAdmin} />
}

export { CalendarPage }
