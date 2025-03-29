import React, { useReducer, useState } from 'react'

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
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value }
    case 'TOGGLE_PENDENCIA':
      return { ...state, gerouPendencia: !state.gerouPendencia, pendencia: '' }
    case 'RESET':
      return initialState
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
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Técnico do Plantão:
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
              <option value="Adriano">Adriano</option>
              <option value="Joao">Joao</option>
              <option value="Marcio">Marcio</option>
              <option value="Yago">Yago</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Data do Plantão:
            <input
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
          </label>
        </div>
        <div>
          <label>
            Local do Chamado:
            <input
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
          </label>
        </div>
        <div>
          <label>
            Responsável do Contato:
            <input
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
          </label>
        </div>
        <div>
          <label>
            Hora de Início:
            <input
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
          </label>
        </div>
        <div>
          <label>
            Hora Final:
            <input
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
          </label>
        </div>
        <div>
          <label>
            Descrição do Ocorrido:
            <textarea
              value={state.descricao}
              onChange={(e) =>
                dispatch({
                  type: 'SET_FIELD',
                  field: 'descricao',
                  value: e.target.value,
                })
              }
            />
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={state.gerouPendencia}
              onChange={() => dispatch({ type: 'TOGGLE_PENDENCIA' })}
            />
            Gerou Pendência
          </label>
        </div>
        {state.gerouPendencia && (
          <label>
            Descrição da Pendência:
            <textarea
              value={state.pendencia}
              onChange={(e) =>
                dispatch({
                  type: 'SET_FIELD',
                  field: 'pendencia',
                  value: e.target.value,
                })
              }
            />
          </label>
        )}
        <button type="submit">Salvar Relatório</button>
      </form>

      <div className="relatorios-grid">
        {relatorios.map((relatorio, index) => (
          <div key={index} className="relatorio-card">
            <p>
              <strong>Técnico:</strong> {relatorio.tecnico}
            </p>
            <p>
              <strong>Data:</strong> {relatorio.data}
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
          </div>
        ))}
      </div>
    </div>
  )
}

export { PendingForm }
