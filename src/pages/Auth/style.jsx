import styled from 'styled-components'

export const Container = styled.div`
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Title = styled.h1`
  margin-bottom: 2rem;
  font-size: 1.8rem;
  color: #333;
`

export const Input = styled.input`
  margin: 0.5rem 0;
  padding: 0.75rem;
  width: 280px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;

  &:focus {
    outline: none;
    border-color: #0077ff;
    box-shadow: 0 0 0 2px #0077ff44;
  }
`

export const AddBtn = styled.button`
  margin-top: 1rem;
  padding: 0.75rem;
  width: 280px;
  background-color: #0077ff;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: #005fcc;
  }
`
