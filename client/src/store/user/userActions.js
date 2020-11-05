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

export const signUp = (userData) => (dispatch) => {
  dispatch({ type: SIGNUP_PROCEED, payload: true })
  axios
    .post('http://localhost:5000/api/customers', userData)
    .then((signUpResult) => {
      if (signUpResult.status === 200) {
        console.log(signUpResult.data)
        dispatch({ type: SIGNUP })
      }
    })
    .catch(({ response: { status, data } }) => {
      console.log('Server Error with Status Code', status)
      console.log('Error', data)
      dispatch({ type: SIGNUP_ERROR, payload: data })
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

          // Фейковая задержка для демонстрации спинера
          // setTimeout(() => {
          dispatch({ type: SIGNIN, payload: token })
          // }, 3000)
          // dispatch(getCustomer())
        }
      }
    })
    .catch(({ response: { status, data } }) => {
      console.log('Server Error with Status Code', status)
      console.log('Error', data)
      // const { loginOrEmail, password } = data
      // if (loginOrEmail) console.log('LoginOrEmail incorrect: ', loginOrEmail)
      // if (password) console.log('Password incorrect: ', password)
      dispatch({ type: SIGNIN_ERROR, payload: data })
      dispatch(signOut())
    })
    .finally(() => {
      // Фейковая задержка для демонстрации спинера
      setTimeout(() => {
        dispatch({ type: SIGNIN_PROCEED, payload: false })
      }, 3000)
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
        console.log('Login Result', loggedInCustomer)
        if (loggedInCustomer.status === 200) {
          console.log('HTTP Request Status 200 - OK')
          const { data } = loggedInCustomer
          dispatch({ type: SIGNIN, payload: token })
          dispatch({ type: SAVE_USER_DATA, payload: data })
        }
      })
      .catch((error) => {
        console.log('Error: ', error)
        dispatch(signOut())
      })
      .finally(() => {
        dispatch({ type: GET_CUSTOMER_PROCEED, payload: false })
      })
  }
}
