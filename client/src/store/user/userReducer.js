import {
  SIGNUP_PROCEED,
  SIGNIN,
  SIGNOUT,
  SIGNIN_PROCEED,
  SIGNIN_ERROR,
  GET_CUSTOMER_PROCEED,
  SAVE_USER_DATA,
} from './userConstants'

const initialStore = {
  isSignInProceed: false,
  isSignUp_Proceed: false,
  isGetCustomerProceed: false,
  token: null,
  data: {
    isAdmin: false,
  },
  errors: {
    signIn: null,
    signUp: null,
    getCustomer: null,
  },
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
    case SIGNIN:
      return {
        ...store,
        token: action.payload,
        errors: { ...store.errors, signIn: null },
      }

    // Начало или окончание процесса логина пользователя
    case SIGNIN_PROCEED:
      return {
        ...store,
        isSignInProceed: action.payload,
      }

    // Начало или окончание процесса логина пользователя
    case SIGNIN_ERROR:
      return {
        ...store,
        errors: { ...store.errors, signIn: action.payload },
      }

    // Разлогинивание пользователя
    case SIGNOUT:
      return {
        ...store,
        token: null,
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
