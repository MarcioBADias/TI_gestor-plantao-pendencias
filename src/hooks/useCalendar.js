import { useEffect, useReducer } from 'react'
import { supabase } from '../supabaseClient'

const initialState = {
  currentDate: new Date(),
  techPerDay: {},
  editingDate: null,
  technicians: [],
}

const reducer = (state, action) => {
  if (action.type === 'SET_DATE') {
    return { ...state, currentDate: action.payload }
  }
  if (action.type === 'SET_TECHNICIANS') {
    return { ...state, technicians: action.payload }
  }
  if (action.type === 'SET_PLANTOES') {
    return { ...state, techPerDay: action.payload }
  }
  if (action.type === 'SET_EDITING_DATE') {
    return { ...state, editingDate: action.payload }
  }

  return state
}

export const useCalendar = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const { currentDate } = state
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const prevMonth = () =>
    dispatch({ type: 'SET_DATE', payload: new Date(year, month - 1) })
  const nextMonth = () =>
    dispatch({ type: 'SET_DATE', payload: new Date(year, month + 1) })

  const fetchTechnicians = async () => {
    const { data, error } = await supabase
      .from('users')
      .select('id, display_name')
    if (!error) dispatch({ type: 'SET_TECHNICIANS', payload: data })
  }

  const fetchPlantaoData = async () => {
    const start = new Date(year, month, 1).toISOString().split('T')[0]
    const end = new Date(year, month + 1, 0).toISOString().split('T')[0]

    const { data, error } = await supabase
      .from('plantoes')
      .select('id, data, id_tecnico, checked')
      .gte('data', start)
      .lte('data', end)

    if (!error) {
      const formatted = {}
      data.forEach(({ data, id_tecnico, checked }) => {
        formatted[data] = { id_tech: id_tecnico, checked }
      })
      dispatch({ type: 'SET_PLANTOES', payload: formatted })
    }
  }

  useEffect(() => {
    fetchTechnicians()
  }, [])

  useEffect(() => {
    fetchPlantaoData()
  }, [state.currentDate])

  return {
    state,
    dispatch,
    prevMonth,
    nextMonth,
    fetchPlantaoData,
  }
}
