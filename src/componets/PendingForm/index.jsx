import React, { useEffect, useReducer, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { FaCog, FaTrash } from 'react-icons/fa'
import {
  AddBtn,
  CardPlantao,
  CheckBox,
  Container,
  Content,
  FilterContainer,
  GridRelatorio,
  Input,
  TextArea,
  Title,
} from './style'

const supabaseUrl = 'https://uhxambgdjkmdgoarezto.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVoeGFtYmdkamttZGdvYXJlenRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2MjM2OTksImV4cCI6MjA1OTE5OTY5OX0.eWbosa73xQPofo4_nantz5gKlLPRFuiYBRcIu0fZTMg'
const supabase = createClient(supabaseUrl, supabaseKey)

const initialState = {
  tecnico: 'Marcio',
  data: new Date().toLocaleString('pt-BR'),
  local: '',
  responsavel: '',
  horaInicio: '',
  horaFinal: '',
  gerouPendencia: false,
  pendencia: '',
  abrirFormulario: false,
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
      return { ...state, abrirFormulario: !state.abrirFormulario }
    default:
      return state
  }
}

const PendingForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [relatorios, setRelatorios] = useState([])
  const [editandoData, setEditandoData] = useState(false)
  const [filterTecnico, setFilterTecnico] = useState('')
  const [filterDataInicio, setFilterDataInicio] = useState('')
  const [filterDataFim, setFilterDataFim] = useState('')

  useEffect(() => {
    const fetchReports = async () => {
      const { data, error } = await supabase
        .from('atendimento')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Erro ao buscar atendimentos:', error.message)
      } else {
        setRelatorios(data)
      }
    }

    fetchReports()
  }, [])

  const handleDelete = async (id) => {
    const { error } = await supabase
      .from('atendimento')
      .delete()
      .match({ id })

    if (error) {
      console.error('Erro ao excluir o relatório:', error.message)
    } else {
      setRelatorios((prevRelatorios) =>
        prevRelatorios.filter((relatorio) => relatorio.id !== id)
      )
      console.log('Relatório excluído com sucesso.')
    }
  }

  const applyFilters = () => {
    return relatorios.filter((relatorio) => {
      const tecnicoMatch = filterTecnico ? relatorio.tecnico === filterTecnico : true
      const dataMatch =
        (filterDataInicio ? new Date(relatorio.created_at) >= new Date(filterDataInicio) : true) &&
        (filterDataFim ? new Date(relatorio.created_at) <= new Date(filterDataFim) : true)
      return tecnicoMatch && dataMatch
    })
  }

  const formatDate = (date) => {
    const options = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }
    const localDate = new Date(date + 'T00:00:00')

    return localDate.toLocaleDateString('pt-BR', options)
  }

  const handleSaveData = () => {
    dispatch({ type: 'SET_FIELD', field: 'data', value: state.data })
    setEditandoData(false)
  }

  // const enviarPendencias = async () => {
  //   const pendencias = [ 
  //     "Servidor fora do ar", 
  //     "Erro na API de login" 
  //   ]
  
  //   await fetch("https://seu-n8n.com/webhook/pendencias", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ pendencias }),
  //   })
  
  //   alert("Pendências enviadas!");
  // };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newReport = {
      tecnico: state.tecnico,
      created_at: new Date().toLocaleString('sv-SE', {
        timeZone: 'America/Sao_Paulo',
      }),
      local: state.local,
      responsavel: state.responsavel,
      hora_ini: state.horaInicio,
      hora_fini: state.horaFinal,
      pendencias: state.gerouPendencia ? state.pendencia : '',
    }
    const { data, error } = await supabase
      .from('atendimento')
      .insert([newReport])

    // if (state.pendencia) {
    //   await fetch("http://192.168.15.65:3001/webhook-test/pendencias", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(state.pendencia),
    //   })
    // }

    if (error) {
      console.error('Erro ao salvar no Supabase:', error.message)
    } else {
      console.log('Salvo com sucesso:', data)
      setRelatorios([...relatorios, newReport])
      dispatch({ type: 'RESET' })
    }
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

      <Title>
        Plantão Referente ao dia: {formatDate(state.data)}
        <FaCog
          style={{ marginLeft: 10, cursor: 'pointer' }}
          onClick={() => setEditandoData(true)}
        />
      </Title>

      {editandoData && (
        <div>
          <Input
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
          <button onClick={handleSaveData}>Salvar</button>
        </div>
      )}
      <h2>
        Valor do plantão:
        {formatDate(state.data).includes('domingo')
          ? 'R$100,00'
          : formatDate(state.data).includes('sábado')
            ? 'R$100,00'
            : formatDate(state.data).includes('sexta-feira')
              ? 'R$100,00'
              : 'R$ 80,00'}
      </h2>
      <h2>Técnico: {state.tecnico}</h2>
      <p style={{ marginTop: 20 }}>____________________________________________</p>

      {state.abrirFormulario && (
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
              <option value="">Selecione o Técnico de plantão</option>
              <option value="Adriano">Adriano</option>
              <option value="Joao">Joao</option>
              <option value="Marcio">Marcio</option>
              <option value="Yago">Yago</option>
            </select>
          </Content>
          <Content>
            <Input
              placeholder="Local do Chamado:"
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
              placeholder="Responsável do Contato:"
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
              placeholder="Hora de Início:"
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
              placeholder="Hora Final:"
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
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <CheckBox
                type="checkbox"
                checked={state.gerouPendencia}
                onChange={() => dispatch({ type: 'TOGGLE_PENDENCIA' })}
              />
              Gerou Pendência ?
            </div>
          </Content>
          {state.gerouPendencia && (
            <Content>
              <TextArea
                placeholder="Descrição da Pendência:"
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
      )}

      <AddBtn onClick={() => dispatch({ type: 'SET_OPENFORM' })}>
        {state.abrirFormulario ? 'Fechar campo' : 'Adicionar Atendimenbto'}
      </AddBtn>

      <FilterContainer style={{ marginBottom: 20 }}>
              <select
                value={filterTecnico}
                onChange={(e) => setFilterTecnico(e.target.value)}
              >
                <option value="">Selecione o Técnico</option>
                <option value="Adriano">Adriano</option>
                <option value="Joao">Joao</option>
                <option value="Marcio">Marcio</option>
                <option value="Yago">Yago</option>
              </select>
              <div style={{ display: 'flex', gap: '2rem' , width: '20%' }}>
                <div>
              <Input
                type="date"
                placeholder="Data Início"
                value={filterDataInicio}
                onChange={(e) => setFilterDataInicio(e.target.value)}
              />
                </div>
                <div>
              <Input
                type="date"
                placeholder="Data Fim"
                value={filterDataFim}
                onChange={(e) => setFilterDataFim(e.target.value)}
              />
                </div>
              </div>
      </FilterContainer>

      <GridRelatorio className="relatorios-grid">
        {applyFilters().map((relatorio, index) => (
          <div key={index} >
              <CardPlantao key={index} className="relatorio-card">
              <div>
                <p>
                  <strong>{formatDate(relatorio.created_at.slice(0,10))}</strong>
                </p>
                <p>
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
                {relatorio.pendencia && (
                  <p>
                    <strong>Pendência:</strong> {relatorio.pendencia}
                  </p>
                )}
              </div>
              <div>
              <FaTrash
                style={{ cursor: 'pointer', color: 'red' }}
                onClick={() => handleDelete(relatorio.id)}
                />
              </div>
                </CardPlantao>              
          </div>
        ))}
      </GridRelatorio>
    </Container>
  )
}

export { PendingForm }
