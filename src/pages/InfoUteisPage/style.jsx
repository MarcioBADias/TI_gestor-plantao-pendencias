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

export const AccordionWrapper = styled.div`
  width: 90%;
  max-width: 800px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 1rem;
`

export const AccordionHeader = styled.div`
  background-color: var(--color-primary);
  color: white;
  padding: 15px 20px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.1rem;
  font-weight: bold;

  &:hover {
    background-color: #005fcc;
  }
`

export const AccordionContent = styled.div`
  padding: 15px 20px;
  background-color: #fefefe;
  border-top: 1px solid #eee;
`

export const SubItem = styled.p`
  margin-bottom: 0.5rem;
  color: #333;

  &:last-child {
    margin-bottom: 0;
  }
`