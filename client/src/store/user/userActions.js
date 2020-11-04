import axios from 'axios'
import {
  SIGNUP_PROCEED,
  LOGIN,
  LOGOUT,
  LOGIN_PROCEED,
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
      }
    })
    .catch(({ response: { status, data } }) => {
      console.log('Error', data)
      console.log('Server Error with Status Code', status)
    })
    .finally(() => {
      dispatch({ type: SIGNUP_PROCEED, payload: false })
    })
}

export const signIn = ({ loginOrEmail, password, remember }) => (dispatch) => {
  const userData = {
    loginOrEmail,
    password,
  }

  dispatch({ type: LOGIN_PROCEED, payload: true })
  axios
    .post('http://localhost:5000/api/customers/login', userData)
    .then((loginResult) => {
      if (loginResult.status === 200) {
        if (loginResult.data.success) {
          const { token } = loginResult.data

          if (remember) localStorage.setItem('token', token)
          sessionStorage.setItem('token', token)

          dispatch({ type: LOGIN, payload: token })
          dispatch(getCustomer())
        }
      }
    })
    .catch(({ response: { status, data } }) => {
      console.log('Server Error with Status Code', status)
      const { loginOrEmail, password } = data
      if (loginOrEmail) console.log('LoginOrEmail incorrect: ', loginOrEmail)
      if (password) console.log('Password incorrect: ', password)
      dispatch(signOut())
    })
    .finally(() => {
      dispatch({ type: LOGIN_PROCEED, payload: false })
    })
}

export const signOut = () => (dispatch) => {
  localStorage.removeItem('token')
  sessionStorage.removeItem('token')
  dispatch({ type: LOGOUT })
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
          dispatch({ type: LOGIN, payload: token })
          dispatch({ type: SAVE_USER_DATA, payload: data })
        }
      })
      .catch(({ response: { status, data } }) => {
        console.log('Server Error with Status Code', status)
        console.log('Error: ', data)
        dispatch(signOut())
      })
      .finally(() => {
        dispatch({ type: GET_CUSTOMER_PROCEED, payload: false })
      })
  }
}
