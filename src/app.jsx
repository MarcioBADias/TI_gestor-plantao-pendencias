import { useState } from 'react'
import { Calendar } from './componets/Calendar/Calendar'
import { PendingForm } from './componets/PendingForm'

const App = () => {
  const [selectedDay, setSelectedDay] = useState(null)
  const [formIsOpen, setFormIsOpen] = useState(false)

  const handleClick = (day) => {
    setSelectedDay(day)
    setFormIsOpen(true)
  }

  const handleCloseForm = () => {
    setFormIsOpen(false)
    setSelectedDay(null)
  }

  return (
    <>
      <img
        style={{ maxWidth: '20vw', marginTop: 50 }}
        src="/Logo_noSymbol_BK.png"
        alt="Logo"
      />

      {formIsOpen && selectedDay ? (
        <PendingForm selectedDate={selectedDay} onClose={handleCloseForm} />
      ) : (
        <Calendar onClickedDay={handleClick} />
      )}
    </>
  )
}

export { App }
