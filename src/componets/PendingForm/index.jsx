import React, { useEffect, useReducer, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { 
  FaCog, 
  FaTrash, 
  FaRegArrowAltCircleLeft, 
  FaRegPlusSquare, 
  FaRegCheckCircle,
  FaRegMinusSquare,
} from 'react-icons/fa'
import {
  CardPlantao,
  CheckBox,
  Container,
  Content,
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
        return {
          ...initialState,
          data: state.data,
        }      
    case 'SET_OPENFORM':
      return { ...state, abrirFormulario: !state.abrirFormulario }
    default:
      return state
  }
}

const PendingForm = ({ selectTech, selectedDate, onClose }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [relatorios, setRelatorios] = useState([])
  const [editandoData, setEditandoData] = useState(false)
  const [filterDataInicio, setFilterDataInicio] = useState('')
  const [filterDataFim, setFilterDataFim] = useState('')

  useEffect(() => {
    if (selectedDate) {
      const dataFormatada = new Date(selectedDate).toISOString().split('T')[0]
      dispatch({ type: 'SET_FIELD', field: 'data', value: dataFormatada })
    }
  }, [selectedDate])

  useEffect(() => {
    if (selectTech) {
      dispatch({ type: 'SET_FIELD', field: 'tecnico', value: selectTech })
    }
  }, [selectTech])
  
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
      const createdDate = relatorio.data_atendimento
      const inicioOk = !filterDataInicio || createdDate >= filterDataInicio
      const fimOk = !filterDataFim || createdDate <= filterDataFim
      const matchData = createdDate === new Date(state.data).toISOString().split('T')[0]
      return inicioOk && fimOk && matchData
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

  const enviarMensagem = async () => {
    try {
      const response = await fetch("https://evolutionapi-aqcm.onrender.com/message/sendText/Plantao", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": "7e7eb5k6s1duc1cycnetw" // Coloque sua chave diretamente ou use variáveis de ambiente
        },
        body: JSON.stringify({
          number: "120363025885372734@g.us", // Coloque o número completo com DDI, DDD e @c.us no final
          options: {
            delay: 1200,
            presence: "composing",
            linkPreview: false
          },
          textMessage: {
            text: `Plantão de: ${state.tecnico}\nLocal: ${state.local}\nPENDÊNCIA: *${state.pendencia}*`
          }
          
        })
      });
  
      const data = await response.json();
      console.log("Resposta da API:", data);
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault()
    const newReport = {
      tecnico: state.tecnico,
      data_atendimento: state.data,
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

    if (error) {
      console.error('Erro ao salvar no Supabase:', error.message)
    } else {
      console.log('Salvo com sucesso:', data)
      setRelatorios([...relatorios, newReport])
      if (state.gerouPendencia && state.pendencia.trim() !== '') {
        await enviarMensagem()
      }
      dispatch({ type: 'RESET' })
    }
  }

  return (
    <Container>
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
      <h2>Técnico: {selectTech}</h2>
      <p style={{ marginTop: 20 }}>____________________________________________</p>

      {state.abrirFormulario && (
        <form onSubmit={handleSubmit}>
          <Content>
          <label>Data do chamado</label>
          <Input
                type="date"
                placeholder="Data Início"
                value={state.data}
                onChange={(e) => {
                  dispatch({
                    type: 'SET_FIELD',
                    field: 'data',
                    value: e.target.value,
                  })
                }}
              />
          </Content>
          <Content>
          <label>Local do chamado</label>
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
          <label>Contato do chamado</label>
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
          <label>Hora de início</label>
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
          <label>Hora final</label>
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
      <div style={{ display: 'flex', gap: 10, margin: 20 }}>
        <FaRegArrowAltCircleLeft style={{ width: 40, height: 40 }} onClick={onClose} />
        {
          state.abrirFormulario ?
          <FaRegMinusSquare style={{ width: 40, height: 40, cursor: 'pointer' }} onClick={() => dispatch({ type: 'SET_OPENFORM' })} />:
          <FaRegPlusSquare style={{ width: 40, height: 40, cursor: 'pointer' }} onClick={() => dispatch({ type: 'SET_OPENFORM' })} />
        }
        <FaRegCheckCircle style={{ width: 40, height: 40 }} />
      </div>

      <GridRelatorio className="relatorios-grid">
        {applyFilters().map((relatorio, index) => (
          <div key={index} >
              <CardPlantao key={index} className="relatorio-card">
              <div>
                <p>
                  <strong>{formatDate(relatorio.data_atendimento.slice(0,10))}</strong>
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
