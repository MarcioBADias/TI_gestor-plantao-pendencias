import { useReducer } from 'react'

const initialState = {
  email: '',
  senha: '',
  nome: '',
  isLogin: true,
  error: '',
}

const reducer = (state, action) => {
  if (action.type === 'SET_FIELD') {
    return { ...state, [action.field]: action.value }
  }
  if (action.type === 'TOGGLE_MODE') {
    return { ...state, isLogin: !state.isLogin, error: '' }
  }
  if (action.type === 'SET_ERROR') {
    return { ...state, error: action.error }
  }
  return state
}

export const useAuthFormState = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return { state, dispatch }
}
