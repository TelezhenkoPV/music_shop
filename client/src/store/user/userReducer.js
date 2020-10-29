import {
  SIGNUP_PROCEED,
  LOGIN,
  LOGOUT,
  LOGIN_PROCEED,
  GET_CUSTOMER_PROCEED,
  SAVE_USER_DATA,
} from './userConstants'

const initialStore = {
  isLoginProceed: false,
  isSignUp_Proceed: false,
  isGetCustomerProceed: false,
  data: {
    isAdmin: false,
  },
  // error: null
}

const reducer = (store = initialStore, action) => {
  switch (action.type) {
    // Начало или окончание процесса регистрации нового пользователя
    case SIGNUP_PROCEED:
      return {
        ...store,
        isSignUp_Proceed: action.payload,
      }

    // Авторизация пользователя успешна, получен токен
    case LOGIN:
      return {
        ...store,
        // isAutenticated: true,
        token: action.payload,
      }

    // Разлогинивание пользователя
    case LOGOUT:
      return {
        ...initialStore,
      }

    // Начало или окончание процесса логина пользователя
    case LOGIN_PROCEED:
      return {
        ...store,
        isLoginProceed: action.payload,
      }

    // Начало или окончание процесса получения данных о пользователе
    case GET_CUSTOMER_PROCEED:
      return {
        ...store,
        isGetCustomerProceed: action.payload,
      }

    // Сохранить данные о пользователе
    case SAVE_USER_DATA:
      return {
        ...store,
        data: action.payload,
      }

    default:
      return store
  }
}

export default reducer
