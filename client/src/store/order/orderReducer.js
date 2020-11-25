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

const initialStore = {
  activeStep: 0,
  isProceed: false,
  success: {
    create: null,
  },
  error: {
    create: null,
  },
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
    case ORDER_PROCEED:
      return {
        ...store,
        isProceed: action.payload,
      }
    case ORDER_CREATE_SUCCESS:
      return {
        ...store,
        success: {
          ...store.success,
          create: action.payload,
        },
      }
    case ORDER_CREATE_ERROR:
      return {
        ...store,
        error: {
          ...store.success,
          create: action.payload,
        },
      }
    case CLEAN_ORDER:
      return { ...initialStore }
    default:
      return store
  }
}

export default reducer
