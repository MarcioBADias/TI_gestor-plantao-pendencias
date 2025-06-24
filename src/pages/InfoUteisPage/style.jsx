import styled from 'styled-components'

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  padding: 1rem;
`

export const Title = styled.h1`
  margin-bottom: 2rem;
  color: var(--color-dark);
`

export const SubItem = styled.div`
  margin-bottom: 0.5rem;
  color: #333;

  &:last-child {
    margin-bottom: 0;
  }
`