import styled from 'styled-components'

export const Day = styled.div`
  background-color: ${({ isActive }) => (isActive ? '#e0f7fa' : '#fff')};
  background-color: ${({ hasTech }) => hasTech && '#0fcf2f8d'};
  color: #000;
  text-align: center;
  padding: 10px 0;
  border-radius: 8px;
  height: 100px;
  cursor: pointer;
  font-size: clamp(0.7rem, 1.2vw, 1rem);

  @media (max-width: 700px) {
    height: 80px;
    overflow: hidden;
    font-size: 0.45rem;
  }

  &:hover {
    background-color: #dceeff;
  }

  p,
  span,
  select {
    font-size: inherit;
  }
`
