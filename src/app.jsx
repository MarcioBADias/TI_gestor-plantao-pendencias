import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom'
import { Calendar } from './componets/Calendar/Calendar'
import { PendingForm } from './componets/PendingForm'

const App = () => {
  const [selectedDay, setSelectedDay] = useState(null)
  const [selectTech, setSelectTech] = useState(null)

  return (
    <Router>
      <img
        style={{ maxWidth: '20vw', marginTop: 50 }}
        src="/Logo_noSymbol_BK.png"
        alt="Logo"
      />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              setSelectedDay={setSelectedDay}
              setSelectTech={setSelectTech}
            />
          }
        />
        <Route
          path="/incident-sheet"
          element={
            selectedDay ? (
              <PendingForm
                selectedDate={selectedDay}
                selectTech={selectTech}
                onClose={() => window.history.back()}
              />
            ) : (
              <div>Selecione um item no calendário primeiro.</div>
            )
          }
        />
      </Routes>
    </Router>
  )
}

const Home = ({ setSelectedDay, setSelectTech }) => {
  const navigate = useNavigate()

  const handleClick = (item) => {
    setSelectedDay(item.currentDate)
    setSelectTech(item.technician)
    navigate('/incident-sheet')
  }

  return <Calendar onClickedDay={handleClick} />
}

export { App }
