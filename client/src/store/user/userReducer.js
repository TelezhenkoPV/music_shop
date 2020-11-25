import {
  SET_AUTHENTICATED,
  SIGNUP_SUCCESS,
  SIGNUP_PROCEED,
  SIGNUP_ERROR,
  SIGNIN_SUCCESS,
  SIGNIN_PROCEED,
  SIGNIN_ERROR,
  SIGNOUT,
  GET_CUSTOMER_PROCEED,
  SAVE_USER_DATA,
  TOOGLE_PROFILE_EDIT,
  UPDATE_SUCCESS,
  UPDATE_PROCEED,
  UPDATE_ERROR,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_PROCEED,
  CHANGE_PASSWORD_ERROR,
  GET_USER_ORDERS_PROCEED,
  SAVE_USER_ORDERS,
} from './userConstants'

const initialStore = {
  isAuthenticated: false,
  isSignInProceed: false,
  isSignUpProceed: false,
  isUpdateProceed: false,
  isChangePasswordProceed: false,
  isGetCustomerProceed: false,
  isGetUserOrdersProceed: false,
  isProfileEdit: false,
  token: null,
  data: {},
  errors: {
    signIn: null,
    signUp: null,
    update: null,
    changePassword: null,
    getCustomer: null,
  },
  orders: [],
}

const reducer = (store = initialStore, action) => {
  switch (action.type) {
    // Изменения признака авторизованности пользователя
    case SET_AUTHENTICATED:
      // const {isAuthenticated, token, data: {isAdmin, firstName, lastName}} = action.payload
      return {
        ...store,
        isAuthenticated: action.payload.isAuthenticated,
        token: action.payload.token,
        data: {
          ...store.data,
          isAdmin: action.payload.data.isAdmin,
          firstName: action.payload.data.firstName,
          lastName: action.payload.data.lastName,
        },
      }
    // Регистрация пользователя успешна
    case SIGNUP_SUCCESS:
      return {
        ...store,
        errors: { ...store.errors, signUp: null },
      }

    // Начало или окончание процесса регистрации нового пользователя
    case SIGNUP_PROCEED:
      return {
        ...store,
        isSignUpProceed: action.payload,
      }

    // Ошибки процесса регистрации пользователя
    case SIGNUP_ERROR:
      return {
        ...store,
        errors: { ...store.errors, signUp: action.payload },
      }

    // Авторизация пользователя успешна, получен токен
    case SIGNIN_SUCCESS:
      return {
        ...store,
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
        ...initialStore,
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

    // Флаг редактирования профиля пользователя
    case TOOGLE_PROFILE_EDIT:
      return {
        ...store,
        isProfileEdit: action.payload,
      }

    // Изменение данных о пользователе успешо выполнено
    case UPDATE_SUCCESS:
      return {
        ...store,
        errors: { ...store.errors, update: null },
      }

    // Начало или окончание процесса изменения данных пользователя
    case UPDATE_PROCEED:
      return {
        ...store,
        isUpdateProceed: action.payload,
      }

    // Ошибки процесса изменения данных пользователя
    case UPDATE_ERROR:
      return {
        ...store,
        errors: { ...store.errors, update: action.payload },
      }

    // Изменение пароля успешо выполнено
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...store,
        errors: { ...store.errors, changePassword: null },
      }

    // Начало или окончание процесса изменения пароля
    case CHANGE_PASSWORD_PROCEED:
      return {
        ...store,
        isChangePasswordProceed: action.payload,
      }

    // Ошибки процесса изменения пароля
    case CHANGE_PASSWORD_ERROR:
      return {
        ...store,
        errors: { ...store.errors, changePassword: action.payload },
      }
    case GET_USER_ORDERS_PROCEED:
      return {
        ...store,
        isGetUserOrdersProceed: action.payload,
      }
    case SAVE_USER_ORDERS:
      return {
        ...store,
        orders: [...action.payload],
      }
    default:
      return store
  }
}

export default reducer
