import React, { useReducer, useState } from 'react'
import { AddBtn, CardPlantao, Container, Content, GridRelatorio, Input, TextArea } from './style'

const initialState = {
  tecnico: 'Marcio',
  data: new Date().toISOString().split('T')[0],
  local: '',
  responsavel: '',
  horaInicio: '',
  horaFinal: '',
  descricao: '',
  gerouPendencia: false,
  pendencia: '',
  abrirFormulario: false
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value }
    case 'TOGGLE_PENDENCIA':
      return { ...state, gerouPendencia: !state.gerouPendencia, pendencia: '' }
    case 'RESET':
      return initialState
    case 'SET_OPENFORM':
      return {...state, abrirFormulario: !state.abrirFormulario }
    default:
      return state
  }
}

const PendingForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [relatorios, setRelatorios] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    setRelatorios([...relatorios, state])
    dispatch({ type: 'RESET' })
  }

  return (
    <Container>
      <img
          style={{ maxWidth: '20vw', marginTop: 50 }}
          src="/Logo_noSymbol_BK.png"
          alt="Logo"
        />
        {
          state.abrirFormulario &&
      <form onSubmit={handleSubmit}>
        <Content>
            <select
              value={state.tecnico}
              onChange={(e) =>
                dispatch({
                  type: 'SET_FIELD',
                  field: 'tecnico',
                  value: e.target.value,
                })
              }
            >
              <option value="Adriano">Selecione o Técnico de plantão</option>
              <option value="Adriano">Adriano</option>
              <option value="Joao">Joao</option>
              <option value="Marcio">Marcio</option>
              <option value="Yago">Yago</option>
            </select>
        </Content>
        <Content>
            <Input
              placeholder='Data do Plantão:'
              type="date"
              value={state.data}
              onChange={(e) =>
                dispatch({
                  type: 'SET_FIELD',
                  field: 'data',
                  value: e.target.value,
                })
              }
            />
        </Content>
        <Content>
            <Input
              placeholder='Local do Chamado:'
              type="text"
              value={state.local}
              onChange={(e) =>
                dispatch({
                  type: 'SET_FIELD',
                  field: 'local',
                  value: e.target.value,
                })
              }
            />
        </Content>
        <Content>
            <Input
              placeholder='Responsável do Contato:'
              type="text"
              value={state.responsavel}
              onChange={(e) =>
                dispatch({
                  type: 'SET_FIELD',
                  field: 'responsavel',
                  value: e.target.value,
                })
              }
            />
        </Content>
        <Content>
            <Input
              placeholder='Hora de Início:'
              type="time"
              value={state.horaInicio}
              onChange={(e) =>
                dispatch({
                  type: 'SET_FIELD',
                  field: 'horaInicio',
                  value: e.target.value,
                })
              }
            />
        </Content>
        <Content>
            <Input
              placeholder='Hora Final:'
              type="time"
              value={state.horaFinal}
              onChange={(e) =>
                dispatch({
                  type: 'SET_FIELD',
                  field: 'horaFinal',
                  value: e.target.value,
                })
              }
            />
        </Content>
        <Content>
            <TextArea
              placeholder='Descrição do Ocorrido:'
              value={state.descricao}
              onChange={(e) =>
                dispatch({
                  type: 'SET_FIELD',
                  field: 'descricao',
                  value: e.target.value,
                })
              }
            />
        </Content>
        <Content>
            <Input
              type="checkbox"
              checked={state.gerouPendencia}
              onChange={() => dispatch({ type: 'TOGGLE_PENDENCIA' })}
            />
            Gerou Pendência
        </Content>
        {state.gerouPendencia && (
          <Content>
            <TextArea
              placeholder='Descrição da Pendência:'
              value={state.pendencia}
              onChange={(e) =>
                dispatch({
                  type: 'SET_FIELD',
                  field: 'pendencia',
                  value: e.target.value,
                })
              }
            />

          </Content>
        )}
        <button type="submit">Salvar Relatório</button>
      </form>

        }
      <AddBtn onClick={() => dispatch({ type: 'SET_OPENFORM' })} >{ state.abrirFormulario ? 'Fechar campo' : 'Adicionar Atendimenbto' }</AddBtn>
      <h1>Plantão Referente ao dia: {state.data}</h1>
      <GridRelatorio className="relatorios-grid">
        {relatorios.map((relatorio, index) => (
            <div key={index}>
              <CardPlantao key={index} className="relatorio-card">
                <p>
                <strong>Data:</strong> {relatorio.data}
                <p>
                  <strong>Data:</strong> {relatorio.data}
                </p>
                  <strong>Técnico:</strong> {relatorio.tecnico}
                </p>
                <p>
                  <strong>Local:</strong> {relatorio.local}
                </p>
                <p>
                  <strong>Responsável:</strong> {relatorio.responsavel}
                </p>
                <p>
                  <strong>Hora de Início:</strong> {relatorio.horaInicio}
                </p>
                <p>
                  <strong>Hora Final:</strong> {relatorio.horaFinal}
                </p>
                <p>
                  <strong>Descrição:</strong> {relatorio.descricao}
                </p>
                {relatorio.gerouPendencia && (
                  <p>
                    <strong>Pendência:</strong> {relatorio.pendencia}
                  </p>
                )}
          </CardPlantao>
            </div>
        ))}
      </GridRelatorio>
    </Container>
  )
}

export { PendingForm }
