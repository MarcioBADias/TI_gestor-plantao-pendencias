import styled from 'styled-components'

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
`
export const Content = styled.div`
  margin: 1rem 0;
`

export const Input = styled.input`
  min-width: 100%;
`

export const CheckBox = styled.input`
  border-radius: 100%;
  width: 15px;
  height: 15px;
`

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
`

export const AddBtn = styled.button`
  margin: 1rem 0;
`
export const Title = styled.h1`
  text-align: center;
`

export const FilterContainer = styled.div`
  align-items: center;
  background: var(--color-primary);
  display: flex;
  height: 80px;
  justify-content: space-around;
  padding: 1rem;
  width: 100%;
`

export const GridRelatorio = styled.div`
  align-items: center;
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  padding: 1rem;
  flex-direction: column;
  flex-wrap: wrap;

  @media (min-width: 700px) {
    flex-direction: row;
  }
`

export const CardPlantao = styled.div`
  border: 2px var(--color-dark) solid;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  height: 180px;
  padding: 1rem;
  overflow: auto;
  white-space: normal;
  word-break: break-word;

  @media (min-width: 700px) {
    width: 30vw;
  }
`

export const MenuIcons = styled.div`
  height: 50px;
  width: 50px;
`
