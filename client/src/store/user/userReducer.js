import {
  SIGNUP,
  SIGNUP_PROCEED,
  SIGNUP_ERROR,
  SIGNIN,
  SIGNIN_PROCEED,
  SIGNIN_ERROR,
  SIGNOUT,
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
    // Регистрация пользователя успешна
    case SIGNUP:
      return {
        ...store,
        errors: { ...store.errors, signUp: null },
      }

    // Начало или окончание процесса регистрации нового пользователя
    case SIGNUP_PROCEED:
      return {
        ...store,
        isSignUp_Proceed: action.payload,
      }

    // Ошибки процесса авторизации пользователя
    case SIGNUP_ERROR:
      return {
        ...store,
        errors: { ...store.errors, signUp: action.payload },
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

    // Ошибки процесса авторизации пользователя
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
