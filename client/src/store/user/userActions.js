import axios from 'axios'
import jwt_decode from 'jwt-decode'
import setAuthToken from '../../util/setAuthToken'
import { notificate } from '../notification/notificationActions'
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
  TOOGLE_PROFILE_EDIT,
  UPDATE_SUCCESS,
  UPDATE_PROCEED,
  UPDATE_ERROR,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_PROCEED,
  CHANGE_PASSWORD_ERROR,
} from './userConstants'

export const checkToken = () => (dispatch) => {
  const token = sessionStorage.token || localStorage.token || null
  if (token) {
    setAuthToken(token)
    const decodedToken = jwt_decode(token)
    console.log('Token', token)
    console.log('Decoded token', decodedToken)
  }
  // localStorage.removeItem('token')
  // sessionStorage.removeItem('token')
  // dispatch({ type: SIGNOUT })
}

export const signUp = (userData) => (dispatch) => {
  dispatch({ type: SIGNUP_PROCEED, payload: true })
  axios
    .post('/api/customers', userData)
    .then((signUpResult) => {
      if (signUpResult.status === 200) {
        dispatch({ type: SIGNUP })
      }
    })
    .catch(({ response: { status, data } }) => {
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
    .post('/api/customers/login', userData)
    .then((loginResult) => {
      if (loginResult.status === 200) {
        if (loginResult.data.success) {
          const { token } = loginResult.data

          if (rememberMe) localStorage.setItem('token', token)
          sessionStorage.setItem('token', token)

          dispatch({ type: SIGNIN, payload: token })
          dispatch(getCustomer())
        }
      }
    })
    .catch(({ response: { status, data } }) => {
      dispatch({ type: SIGNIN_ERROR, payload: data })
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
      .get('/api/customers/customer', authOptions)
      .then((loggedInCustomer) => {
        if (loggedInCustomer.status === 200) {
          const { data } = loggedInCustomer

          dispatch({ type: SIGNIN, payload: token })
          dispatch({ type: SAVE_USER_DATA, payload: data })
        }
      })
      .catch(() => {
        dispatch(signOut())
      })
      .finally(() => {
        dispatch({ type: GET_CUSTOMER_PROCEED, payload: false })
      })
  }
}

export const toogleProfileEdit = (isEdit) => (dispatch) => {
  dispatch({ type: TOOGLE_PROFILE_EDIT, payload: isEdit })
}

export const update = (userData) => (dispatch) => {
  dispatch({ type: UPDATE_PROCEED, payload: true })

  const token = sessionStorage.token || localStorage.token || null

  var authOptions = {
    headers: {
      Authorization: token,
    },
  }
  axios
    .put('/api/customers', userData, authOptions)
    .then((updateResult) => {
      if (updateResult.status === 200) {
        dispatch({ type: UPDATE_SUCCESS })
        dispatch({ type: SAVE_USER_DATA, payload: updateResult.data })
        dispatch(
          notificate({
            variant: 'success',
            data: 'User data updated successfully.',
          })
        )
      }
    })
    .catch(({ response: { status, data } }) => {
      dispatch({ type: UPDATE_ERROR, payload: data })
      dispatch(notificate({ variant: 'error', data }))
    })
    .finally(() => {
      // Фейковая задержка для демонстрации спинера
      setTimeout(() => {
        dispatch({ type: UPDATE_PROCEED, payload: false })
      }, 3000)
    })
}

export const changePassword = (passwords) => (dispatch) => {
  dispatch({ type: CHANGE_PASSWORD_PROCEED, payload: true })
  const token = sessionStorage.token || localStorage.token || null

  var authOptions = {
    headers: {
      Authorization: token,
    },
  }
  axios
    .put('/api/customers/password', passwords, authOptions)
    .then((result) => {
      if (result.status === 200) {
        dispatch({ type: CHANGE_PASSWORD_SUCCESS })
        dispatch(
          notificate({
            variant: 'success',
            data: 'Password successfully changed.',
          })
        )
      }
    })
    .catch(({ response: { status, data } }) => {
      dispatch({ type: CHANGE_PASSWORD_ERROR, payload: data })
      dispatch(notificate({ variant: 'error', data }))
    })
    .finally(() => {
      // Фейковая задержка для демонстрации спинера
      setTimeout(() => {
        dispatch({ type: CHANGE_PASSWORD_PROCEED, payload: false })
      }, 3000)
    })
}
