import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 5rem;
  padding: 2rem;
  height: 100vh;
  width: 100vw;
`
export const IconConted = styled.div`
  align-items: center;
  flex-direction: column;
  text-align: center;
`
export const IconButton = styled.div`
  font-size: 4rem;
  cursor: pointer;
  transition: transform 0.2s ease;
  color: var(--color-primary);

  &:hover {
    transform: scale(1.1);
    color: var(--color-dark);
  }
`
export const DirectLink = styled.a`
  :visited {
  color: var(--color-primary);
  text-decoration: none;
}
`

export const Title = styled.p`
  font-size: 1rem;
`
