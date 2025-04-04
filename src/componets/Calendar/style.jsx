import styled from 'styled-components';

export const CalendarContainer = styled.div`
  background-color: #fefefe;
  border: 1px solid #ddd;
  border-radius: 16px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  height: 80%;
  margin: 30px auto;
  padding: 20px;
  width: 90vw;
  `;

export const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  h2 {
    font-size: 1.2rem;
    text-transform: capitalize;
  }
`;

export const NavButton = styled.button`
  background: #0077ff;
  color: white;
  border: none;
  padding: 5px 10px;
  font-size: 1rem;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: #005fcc;
  }
`;

export const WeekDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  font-weight: bold;
  text-align: center;
  margin-bottom: 8px;
  height: 100%;
`;

export const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
`;

export const Day = styled.div`
  text-align: center;
  padding: 10px 0;
  border-radius: 8px;
  background-color: #f3f3f3;
  height: 100px;
  cursor: pointer;

  &:hover {
    background-color: #dceeff;
  }
`;
