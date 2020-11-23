import axios from 'axios'
import jwt_decode from 'jwt-decode'
import setAuthToken from '../../util/setAuthToken'
import { notificate } from '../notification/notificationActions'
import {
  SET_AUTHENTICATED,
  SIGNUP_SUCCESS,
  SIGNUP_PROCEED,
  SIGNUP_ERROR,
  SIGNIN_SUCCESS,
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

export const checkToken = (token = null) => (dispatch) => {
  const tokenToCheck =
    token || sessionStorage.token || localStorage.token || null
  if (tokenToCheck) {
    setAuthToken(tokenToCheck)
    const decodedToken = jwt_decode(tokenToCheck)
    const { firstName, lastName, isAdmin, exp } = decodedToken
    // console.log('Token', token)
    // const {firstName, lastName, isAdmin, exp, iat} = decodedToken
    // console.log('Decoded token', decodedToken)
    // console.log('Token firstName, lastName, isAdmin:', firstName, lastName, isAdmin)
    // const expUTC = new Date(new Date(0).setUTCSeconds(exp))
    // const iatUTC = new Date(new Date(0).setUTCSeconds(iat))
    // console.log('Token created', iatUTC)
    // console.log('Token expired', expUTC)
    dispatch({
      type: SET_AUTHENTICATED,
      payload: {
        isAuthenticated: true,
        token: tokenToCheck,
        data: { isAdmin, firstName, lastName },
      },
    })
    if (exp < Date.now() / 1000) {
      dispatch(signOut())
      window.location.href = '/'
    }
  }
}

export const signUp = (userData) => (dispatch) => {
  dispatch({ type: SIGNUP_PROCEED, payload: true })
  axios
    .post('/api/customers', userData)
    .then((signUpResult) => {
      if (signUpResult.status === 200) {
        dispatch({ type: SIGNUP_SUCCESS })
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

          dispatch(checkToken())
          dispatch({ type: SIGNIN_SUCCESS })
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
  notificate({
    variant: 'info',
    data: 'Loged out.',
  })
}

export const getCustomer = () => (dispatch) => {
  dispatch({ type: GET_CUSTOMER_PROCEED, payload: true })
  axios
    .get('/api/customers/customer')
    .then((loggedInCustomer) => {
      if (loggedInCustomer.status === 200) {
        const { data } = loggedInCustomer

        dispatch({ type: SAVE_USER_DATA, payload: data })
        notificate({
          variant: 'success',
          data: 'Customer personal information recieved.',
        })
      }
    })
    .catch(() => {
      dispatch(signOut())
    })
    .finally(() => {
      dispatch({ type: GET_CUSTOMER_PROCEED, payload: false })
    })
}

export const toogleProfileEdit = (isEdit) => (dispatch) => {
  dispatch({ type: TOOGLE_PROFILE_EDIT, payload: isEdit })
}

export const update = (userData) => (dispatch) => {
  dispatch({ type: UPDATE_PROCEED, payload: true })
  axios
    .put('/api/customers', userData)
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
  axios
    .put('/api/customers/password', passwords)
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
