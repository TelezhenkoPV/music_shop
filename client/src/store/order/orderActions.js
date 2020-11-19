// import axios from 'axios'
import {
  SAVE_CUSTOMER_DATA,
  SAVE_SHIPPING_DATA,
  SAVE_PAYMENT_DATA,
  // CHANGE_PASSWORD_SUCCESS,
  // CHANGE_PASSWORD_PROCEED,
  // CHANGE_PASSWORD_ERROR,
} from './orderConstants'
// import { notificate } from '../notification/notificationActions'

export const saveCustomerData = (data) => (dispatch) => {
  dispatch({ type: SAVE_CUSTOMER_DATA, payload: data })
}

export const saveShippingData = (data) => (dispatch) => {
  dispatch({ type: SAVE_SHIPPING_DATA, payload: data })
}

export const savePaymentData = (data) => (dispatch) => {
  dispatch({ type: SAVE_PAYMENT_DATA, payload: data })
}
