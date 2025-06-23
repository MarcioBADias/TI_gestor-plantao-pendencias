import styled from "styled-components"

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