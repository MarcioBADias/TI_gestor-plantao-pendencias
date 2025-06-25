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
  border-bottom: 2px var(--color-primary) solid;
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  padding: 0.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`

export const SubTitle = styled.p`
  color: var(--color-primary);
  font-weight: bold;
`