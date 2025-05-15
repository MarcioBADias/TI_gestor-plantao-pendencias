import React from 'react'
import { FiLogOut } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Header = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 40px',
      }}
    >
      <img
        style={{ maxWidth: '20vw' }}
        src="/Logo_noSymbol_BK.png"
        alt="Logo"
      />

      {user && (
        <div style={{ display: 'flex', gap: 10 }}>
          <h3>{`Ola ${user.display_name} veja seus plantoes`}</h3>
          <FiLogOut
            title="Sair"
            onClick={handleLogout}
            style={{
              cursor: 'pointer',
              color: '#555',
              fontSize: 28,
            }}
          />
        </div>
      )}
    </div>
  )
}

export { Header }
