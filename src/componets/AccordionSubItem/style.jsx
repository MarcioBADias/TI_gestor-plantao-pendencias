import styled from "styled-components"

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

export const SubItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
`

export const CopyStatus = styled.span`
  color: green;
  margin-left: 10px;
  font-weight: bold;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
`

export const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem; 
`