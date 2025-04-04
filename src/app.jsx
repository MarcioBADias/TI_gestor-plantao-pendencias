import { Calendar } from './componets/Calendar/Calendar'
import { PendingForm } from './componets/PendingForm'

const App = () => {
  return (
    <>
      <img
              style={{ maxWidth: '20vw', marginTop: 50 }}
              src="/Logo_noSymbol_BK.png"
              alt="Logo"
            />
      <PendingForm />
      <Calendar />
    </>
  )
}

export { App }
