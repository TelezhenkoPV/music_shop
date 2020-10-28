import axios from 'axios'
import {
  LOGIN,
  LOGOUT,
  LOGIN_isPROCEED,
  GET_CUSTOMER_isPROCEED,
  SAVE_USER_DATA,
} from './userConstants'

export const loginUser = ({ loginOrEmail, password }) => (dispatch) => {
  const userData = {
    loginOrEmail,
    password,
  }

  dispatch({ type: LOGIN_isPROCEED, payload: true })
  axios
    .post('http://localhost:5000/api/customers/login', userData)
    .then((loginResult) => {
      if (loginResult.status === 200) {
        if (loginResult.data.success) {
          const { token } = loginResult.data
          dispatch({ type: LOGIN, payload: token })
          // dispatch(getCustomer(token))
        }
      }
    })
    .catch(({ response: { status, data } }) => {
      console.log('Server Error with Status Code', status)
      const { loginOrEmail, password } = data
      if (loginOrEmail) console.log('LoginOrEmail incorrect: ', loginOrEmail)
      if (password) console.log('Password incorrect: ', password)
    })
    .finally(() => {
      dispatch({ type: LOGIN_isPROCEED, payload: false })
    })
}

export const logoutUser = () => (dispatch) => {
  dispatch({ type: LOGOUT })
}

export const getCustomer = ({ token }) => (dispatch) => {
  dispatch({ type: GET_CUSTOMER_isPROCEED, payload: true })
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
        dispatch({ type: SAVE_USER_DATA, payload: data })
      }
    })
    .catch(({ response: { status, data } }) => {
      console.log('Server Error with Status Code', status)
      console.log('Error: ', data)
    })
    .finally(() => {
      dispatch({ type: GET_CUSTOMER_isPROCEED, payload: false })
    })
}
