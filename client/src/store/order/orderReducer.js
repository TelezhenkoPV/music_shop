import {
  SAVE_CUSTOMER_DATA,
  SAVE_SHIPPING_DATA,
  SAVE_PAYMENT_DATA,
} from './orderConstants'

const initialStore = {
  isCustomerSet: false,
  customer: {},
  isShippingSet: false,
  shipping: {},
  isPaymentSet: false,
  payment: {},
  products: {},
}

const reducer = (store = initialStore, action) => {
  switch (action.type) {
    case SAVE_CUSTOMER_DATA:
      return {
        ...store,
        customer: action.payload,
        isCustomerSet: true,
      }
    case SAVE_SHIPPING_DATA:
      return {
        ...store,
        shipping: action.payload,
        isShippingSet: true,
      }
    case SAVE_PAYMENT_DATA:
      return {
        ...store,
        payment: action.payload,
        isPaymentSet: true,
      }

    default:
      return store
  }
}

export default reducer
