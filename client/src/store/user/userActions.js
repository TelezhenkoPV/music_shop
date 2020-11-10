import axios from 'axios'
import {
  SIGNUP,
  SIGNUP_PROCEED,
  SIGNUP_ERROR,
  SIGNIN,
  SIGNOUT,
  SIGNIN_PROCEED,
  SIGNIN_ERROR,
  GET_CUSTOMER_PROCEED,
  SAVE_USER_DATA,
} from './userConstants'
import { notificate } from '../notification/notificationActions'

export const signUp = (userData) => (dispatch) => {
  dispatch({ type: SIGNUP_PROCEED, payload: true })
  axios
    .post('http://localhost:5000/api/customers', userData)
    .then((signUpResult) => {
      if (signUpResult.status === 200) {
        console.log(signUpResult.data)
        dispatch({ type: SIGNUP })
        dispatch(
          notificate({
            variant: 'success',
            data: 'Успешная регистрация на сервере.',
          })
        )
      }
    })
    .catch(({ response: { status, data } }) => {
      dispatch({ type: SIGNUP_ERROR, payload: data })
      dispatch(notificate({ variant: 'error', data }))
    })
    .finally(() => {
      // Фейковая задержка для демонстрации спинера
      setTimeout(() => {
        dispatch({ type: SIGNUP_PROCEED, payload: false })
      }, 3000)
    })
}

export const signIn = ({ loginOrEmail, password, rememberMe }) => (
  dispatch
) => {
  const userData = {
    loginOrEmail,
    password,
  }

  dispatch({ type: SIGNIN_PROCEED, payload: true })
  axios
    .post('http://localhost:5000/api/customers/login', userData)
    .then((loginResult) => {
      if (loginResult.status === 200) {
        if (loginResult.data.success) {
          const { token } = loginResult.data

          if (rememberMe) localStorage.setItem('token', token)
          sessionStorage.setItem('token', token)

          dispatch({ type: SIGNIN, payload: token })
          dispatch(
            notificate({
              variant: 'success',
              data: 'Успешная авторизация на сервере.',
              key: 'signInSuccess',
            })
          )
          dispatch(getCustomer())
        }
      }
    })
    .catch(({ response: { status, data } }) => {
      dispatch({ type: SIGNIN_ERROR, payload: data })
      dispatch(notificate({ variant: 'error', data }))
      dispatch(signOut())
    })
    .finally(() => {
      // Фейковая задержка для демонстрации спинера
      setTimeout(() => {
        dispatch({ type: SIGNIN_PROCEED, payload: false })
      }, 1000)
    })
}

export const signOut = () => (dispatch) => {
  localStorage.removeItem('token')
  sessionStorage.removeItem('token')
  dispatch({ type: SIGNOUT })
}

export const getCustomer = () => (dispatch) => {
  const token = sessionStorage.token || localStorage.token || null

  if (token) {
    dispatch({ type: GET_CUSTOMER_PROCEED, payload: true })
    var authOptions = {
      headers: {
        Authorization: token,
      },
    }
    axios
      .get('http://localhost:5000/api/customers/customer', authOptions)
      .then((loggedInCustomer) => {
        if (loggedInCustomer.status === 200) {
          const { data } = loggedInCustomer

          dispatch({ type: SIGNIN, payload: token })
          dispatch({ type: SAVE_USER_DATA, payload: data })
          dispatch(
            notificate({
              variant: 'success',
              data: 'Успешная авторизация на сервере.',
              key: 'signInSuccess',
            })
          )
        }
      })
      .catch((error) => {
        dispatch(notificate({ variant: 'error', data: error.message }))
        dispatch(signOut())
      })
      .finally(() => {
        dispatch({ type: GET_CUSTOMER_PROCEED, payload: false })
      })
  }
}
