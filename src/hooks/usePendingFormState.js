import { useReducer } from "react";

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
    editandoData: false,
    loading: false,
    filterDataInicio: '',
    filterDataFim: '',
  }

  const reducer = (state, action) => {
    if (action.type === 'SET_FIELD') {
      return { ...state, [action.field]: action.value }
    }
    if (action.type === 'TOGGLE_PENDENCIA') {
      return { ...state, gerouPendencia: !state.gerouPendencia, pendencia: '' }
    }
    if (action.type === 'RESET') {
      return {
        ...initialState,
        data: state.data,
      }
    }
    if (action.type === 'SET_OPENFORM') {
      return { ...state, abrirFormulario: !state.abrirFormulario }
    }
    if (action.type === 'TOGGLE_EDIT_DATE') {
      return { ...state, editandoData: !state.editandoData }
    }
    if (action.type === 'SET_LOADING') {
      return { ...state, loading: action.value }
    }
    return state
  }

  const usePendingFormState = () => {
    const [state, dispatch] = useReducer
    return { state, dispatch }
  }

  export { usePendingFormState }