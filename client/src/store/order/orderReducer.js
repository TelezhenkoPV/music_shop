import {
  SET_ACTIVE_STEP,
  SAVE_CUSTOMER_DATA,
  SAVE_SHIPPING_DATA,
  SAVE_PAYMENT_DATA,
} from './orderConstants'

const initialStore = {
  activeStep: 0,
  isCustomerSet: false,
  customer: {},
  shipping: {
    type: null,
    addressDelivery: {
      isShippingSet: false,
      data: {},
    },
    novaPoshta: {
      isShippingSet: false,
      data: {},
    },
  },
  isPaymentSet: false,
  payment: {},
  products: {},
}

const reducer = (store = initialStore, action) => {
  switch (action.type) {
    case SET_ACTIVE_STEP:
      return {
        ...store,
        activeStep: action.payload,
      }
    case SAVE_CUSTOMER_DATA:
      return {
        ...store,
        customer: action.payload,
        isCustomerSet: true,
      }
    case SAVE_SHIPPING_DATA:
      return {
        ...store,
        shipping: {
          ...store.shipping,
          ...action.payload,
        },
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
