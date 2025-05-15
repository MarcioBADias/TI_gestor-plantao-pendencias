import { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from 'react-router-dom'
import { Calendar } from './componets/Calendar/Calendar'
import { PendingForm } from './componets/PendingForm'
import { useAuth } from './context/AuthContext'
import { Auth } from './pages/Auth'
import { Header } from './componets/Header'

const App = () => {
  const [selectedDay, setSelectedDay] = useState(null)
  const [selectTech, setSelectTech] = useState(null)

  return (
    <Router>
      <AppRoutes
        selectedDay={selectedDay}
        selectTech={selectTech}
        setSelectedDay={setSelectedDay}
        setSelectTech={setSelectTech}
      />
    </Router>
  )
}

const AppRoutes = ({
  selectedDay,
  selectTech,
  setSelectedDay,
  setSelectTech,
}) => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!user && location.pathname !== '/login') {
      navigate('/login')
    }
  }, [user, location.pathname, navigate])

  return (
    <>
      <Header />

      <Routes>
        <Route path="/login" element={<Auth />} />
        <Route
          path="/"
          element={
            user ? (
              <CalendarWrapper
                setSelectedDay={setSelectedDay}
                setSelectTech={setSelectTech}
              />
            ) : null
          }
        />
        <Route
          path="/incident-sheet"
          element={
            user ? (
              selectedDay ? (
                <PendingForm
                  selectedDate={selectedDay}
                  selectTech={selectTech}
                  onClose={() => navigate(-1)}
                />
              ) : (
                <div>Selecione um item no calendário primeiro.</div>
              )
            ) : null
          }
        />
      </Routes>
    </>
  )
}

const CalendarWrapper = ({ setSelectedDay, setSelectTech }) => {
  const navigate = useNavigate()

  const handleClick = (item) => {
    setSelectedDay(item.currentDate)
    setSelectTech(item.technician)
    navigate('/incident-sheet')
  }

  return <Calendar onClickedDay={handleClick} />
}

export { App }
