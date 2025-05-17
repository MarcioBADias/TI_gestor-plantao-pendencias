import React from 'react'
import { SpinnerContainer, SpinningImage } from './style'

const Spin = () => {
  return (
    <SpinnerContainer>
      <SpinningImage src="/Logo_Symbil_Blue.png" alt="Carregando..." />
    </SpinnerContainer>
  )
}

export { Spin }
