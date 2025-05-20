import { useNavigate } from 'react-router-dom'
import { Calendar } from '../../componets/Calendar/Calendar'

const CalendarPage = ({ setSelectedDay, setSelectTech }) => {
  const navigate = useNavigate()

  const handleClick = ({ currentDate, technician }) => {
    setSelectedDay(currentDate)
    setSelectTech(technician)
    navigate('/incident-sheet')
  }

  return <Calendar onClickedDay={handleClick} />
}

export { CalendarPage }
