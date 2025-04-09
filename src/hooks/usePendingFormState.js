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
      case 'TOGGLE_EDIT_DATE':
        return { ...state, editandoData: !state.editandoData }
      case 'SET_LOADING':
        return { ...state, loading: action.value }
      default:
        return state
    }
  }

  const usePendingFormState = () => {
    const [state, dispatch] = useReducer
    return { state, dispatch }
  }

  export { usePendingFormState }