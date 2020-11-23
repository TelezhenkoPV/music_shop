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
  console.log('Order sended to server', order)
}
