import { useState } from 'react'
import { Calendar } from './componets/Calendar/Calendar'
import { PendingForm } from './componets/PendingForm'

const App = () => {
  const [ formisOpen, setFormIsOpen ] = useState(false)
  return (
    <>
      <img
              style={{ maxWidth: '20vw', marginTop: 50 }}
              src="/Logo_noSymbol_BK.png"
              alt="Logo"
            />
      { formisOpen ? <Calendar onClickedDay = {() => setFormIsOpen(!formisOpen)} /> : <PendingForm onClickedDay = {() => setFormIsOpen(!formisOpen)} /> }
    </>
  )
}

export { App }
