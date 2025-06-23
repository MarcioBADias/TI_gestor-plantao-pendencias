// src/Routes.jsx
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import { useState, useEffect } from 'react'
import { Auth } from './pages/Auth'
import { CalendarPage } from './pages/CalendarPage'
import { PendingForm } from './componets/PendingForm'
import { Home } from './pages/Home'
import { GoogleSheetPage } from './pages/GoogleSheetPage'
import { InfoUteisPage } from './pages/InfoUteisPage'

const AppRoutes = () => {
  const [selectedDay, setSelectedDay] = useState(null)
  const [selectTech, setSelectTech] = useState(null)
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!user && location.pathname !== '/login') {
      navigate('/login')
    }
  }, [user, location.pathname, navigate])

  return (
    <Routes>
      <Route path="/login" element={<Auth />} />
      <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
      <Route path="/cltron" element={<GoogleSheetPage />} />
      <Route
        path="/calendar"
        element={
          user ? (
            <CalendarPage
              setSelectedDay={setSelectedDay}
              setSelectTech={setSelectTech}
            />
          ) : (
            <Navigate to="/login" />
          )
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
          ) : (
            <Navigate to="/login" />
          )
        }
      />
       <Route
        path="/info-uteis"
        element={user ? <InfoUteisPage /> : <Navigate to="/login" />} // Protegida por autenticação
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export { AppRoutes }
