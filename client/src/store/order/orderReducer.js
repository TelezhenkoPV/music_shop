import {
  SET_ACTIVE_STEP,
  SAVE_CUSTOMER_DATA,
  SAVE_SHIPPING_DATA,
  SAVE_PAYMENT_DATA,
} from './orderConstants'

const initialStore = {
  activeStep: 0,
  customer: {
    isCustomerSet: false,
    data: {},
  },
  shipping: {
    type: { key: null, label: '' },
    addressDelivery: {
      isShippingSet: false,
      isAddressFromProfile: false,
      data: [{}],
    },
    novaPoshta: {
      isShippingSet: false,
      isAddressFromProfile: false,
      data: [{}],
    },
  },
  payment: {
    type: { key: null, label: '' },
    cash: {
      isPaymentSet: false,
      data: {},
    },
    creditCard: {
      isPaymentSet: false,
      data: {},
    },
  },
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
        customer: {
          ...store.customer,
          ...action.payload,
        },
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
        payment: {
          ...store.payment,
          ...action.payload,
        },
      }
    default:
      return store
  }
}

export default reducer
