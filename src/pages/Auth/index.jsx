import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Form, Input, AddBtn, Title } from './style'
import { useAuthFormState } from '../../hooks/useAuthFormState'
import { useAuth } from '../../context/AuthContext'

const Auth = () => {
  const { state, dispatch } = useAuthFormState()
  const { login, register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch({ type: 'SET_ERROR', error: '' })

    const result = state.isLogin
      ? await login({ email: state.email, password: state.senha })
      : await register({
          email: state.email,
          password: state.senha,
          display_name: state.nome,
        })

    if (result.error) {
      dispatch({ type: 'SET_ERROR', error: result.error })
    } else {
      navigate('/')
    }
  }

  return (
    <Container>
      <Title>{state.isLogin ? 'Login' : 'Cadastro'}</Title>

      <Form onSubmit={handleSubmit}>
        {!state.isLogin && (
          <Input
            type="text"
            placeholder="Nome completo"
            value={state.nome}
            onChange={(e) =>
              dispatch({
                type: 'SET_FIELD',
                field: 'nome',
                value: e.target.value,
              })
            }
          />
        )}

        <Input
          type="email"
          placeholder="Email"
          value={state.email}
          onChange={(e) =>
            dispatch({
              type: 'SET_FIELD',
              field: 'email',
              value: e.target.value,
            })
          }
        />

        <Input
          type="password"
          placeholder="Senha"
          value={state.senha}
          onChange={(e) =>
            dispatch({
              type: 'SET_FIELD',
              field: 'senha',
              value: e.target.value,
            })
          }
        />

        <AddBtn type="submit">{state.isLogin ? 'Entrar' : 'Cadastrar'}</AddBtn>
      </Form>

      <AddBtn onClick={() => dispatch({ type: 'TOGGLE_MODE' })}>
        {state.isLogin
          ? 'Não tem conta? Cadastre-se'
          : 'Já tem conta? Faça login'}
      </AddBtn>

      {state.error && <p style={{ color: 'red' }}>{state.error}</p>}
    </Container>
  )
}

export { Auth }
