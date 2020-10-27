import {
  LOGIN,
  LOGOUT,
  LOGIN_isPROCEED,
  GET_CUSTOMER_isPROCEED,
  SAVE_USER_DATA,
} from './userConstants'

const initialStore = {
  isAutenticated: false,
  isLoginProceed: false,
  token: null,
  data: {
    isAdmin: false,
  },
  // error: null
}

const reducer = (store = initialStore, action) => {
  switch (action.type) {
    // Авторизация пользователя успешна, получен токен
    case LOGIN:
      return {
        ...store,
        isAutenticated: true,
        token: action.payload,
      }

    // Разлогинивание пользователя
    case LOGOUT:
      return {
        ...initialStore,
      }

    // Начало или окончание процесса логина пользователя
    case LOGIN_isPROCEED:
      return {
        ...store,
        isLoginProceed: action.payload,
      }

    // Начало или окончание процесса получения данных о пользователе
    case GET_CUSTOMER_isPROCEED:
      return {
        ...store,
        isGET_CUSTOMERProceed: action.payload,
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
