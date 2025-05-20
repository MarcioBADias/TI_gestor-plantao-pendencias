import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

export const IconButton = styled.div`
  font-size: 4rem;
  cursor: pointer;
  transition: transform 0.2s ease;
  color: #007bff;

  &:hover {
    transform: scale(1.1);
  }
`
