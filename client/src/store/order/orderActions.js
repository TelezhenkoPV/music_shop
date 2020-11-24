import axios from 'axios'
import { notificate } from '../notification/notificationActions'
import { clean as basketClean } from '../basket/basketAction'
import {
  SET_ACTIVE_STEP,
  SAVE_CUSTOMER_DATA,
  SAVE_SHIPPING_DATA,
  SAVE_PAYMENT_DATA,
  ORDER_PROCEED,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_ERROR,
  CLEAN_ORDER,
} from './orderConstants'

export const setActiveStep = (data) => (dispatch) => {
  dispatch({ type: SET_ACTIVE_STEP, payload: data })
}

export const saveCustomerData = (data) => (dispatch) => {
  dispatch({
    type: SAVE_CUSTOMER_DATA,
    payload: { isCustomerSet: true, data },
  })
}

export const saveShippingData = (shippingData) => (dispatch) => {
  const { type, isAddressFromProfile = 'false', data } = shippingData
  dispatch({
    type: SAVE_SHIPPING_DATA,
    payload: {
      type,
      [type.key]: { isShippingSet: true, isAddressFromProfile, data },
    },
  })
}

export const savePaymentData = (paymentData) => (dispatch) => {
  const { type, data } = paymentData
  dispatch({
    type: SAVE_PAYMENT_DATA,
    payload: { type, [type.key]: { isPaymentSet: true, data } },
  })
}

export const sendOrder = (order) => (dispatch) => {
  dispatch({ type: ORDER_PROCEED, payload: true })
  axios
    .post('/api/orders', order)
    .then((response) => {
      if (response.status === 200) {
        const { data } = response
        dispatch({ type: ORDER_CREATE_SUCCESS, payload: data })
        dispatch(basketClean())

        dispatch(
          notificate({
            variant: 'success',
            data: `Order №${data.order.orderNo} successfully created.`,
          })
        )
      }
    })
    .catch(({ response: { status, data } }) => {
      dispatch({ type: ORDER_CREATE_ERROR, payload: data })
      dispatch(notificate({ variant: 'error', data }))
    })
    .finally(() => {
      // Фейковая задержка для демонстрации спинера
      setTimeout(() => {
        dispatch({ type: ORDER_PROCEED, payload: false })
      }, 3000)
    })
}

export const cleanOrder = () => (dispatch) => {
  dispatch({ type: CLEAN_ORDER })
}
