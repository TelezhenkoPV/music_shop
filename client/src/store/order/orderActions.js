import {
  SET_ACTIVE_STEP,
  SAVE_CUSTOMER_DATA,
  SAVE_SHIPPING_DATA,
  SAVE_PAYMENT_DATA,
} from './orderConstants'

export const setActiveStep = (data) => (dispatch) => {
  dispatch({ type: SET_ACTIVE_STEP, payload: data })
}

export const saveCustomerData = (data) => (dispatch) => {
  dispatch({ type: SAVE_CUSTOMER_DATA, payload: data })
}

export const saveShippingData = (shippingData) => (dispatch) => {
  const { type, data } = shippingData
  dispatch({
    type: SAVE_SHIPPING_DATA,
    payload: { type, [type]: { isShippingSet: true, data } },
  })
}

export const savePaymentData = (paymentData) => (dispatch) => {
  const { type, data } = paymentData
  dispatch({
    type: SAVE_PAYMENT_DATA,
    payload: { type, [type]: { isPaymentSet: true, data } },
  })
}
