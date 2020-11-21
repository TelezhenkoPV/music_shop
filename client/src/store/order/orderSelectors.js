// Order Stepper
export const getActiveStep = (store) => store.order.activeStep

// Customer
export const getIsCustomerSet = (store) => store.order.customer.isCustomerSet
export const getCustomerData = (store) => store.order.customer.data

// Shipping
export const getShippingMethod = (store) => store.order.shipping.type
export const getShippingData = (store) => {
  return {
    type: getShippingMethod(store),
    data: store.order.shipping[getShippingMethod(store)].data,
  }
}

export const getIsAddressDeliverySet = (store) =>
  store.order.shipping.addressDelivery.isShippingSet
export const getAddressDeliveryData = (store) =>
  store.order.shipping.addressDelivery.data

export const getIsNovaPoshtaSet = (store) =>
  store.order.shipping.novaPoshta.isShippingSet
export const getNovaPoshtaData = (store) => store.order.shipping.novaPoshta.data

// Payment
export const getPaymentMethod = (store) => store.order.payment.type
export const getPaymentData = (store) => {
  return {
    type: getPaymentMethod(store),
    data: store.order.payment[getPaymentMethod(store)].data,
  }
}

export const getIsCashSet = (store) => store.order.payment.cash.isPaymentSet
export const getCashData = (store) => store.order.payment.cash.data

export const getIsCreditCardSet = (store) =>
  store.order.payment.creditCard.isPaymentSet
export const getCreditCardData = (store) => store.order.payment.creditCard.data

// Order
export const getOrderData = (store) => {
  return {
    customer: { ...getCustomerData(store) },
    shipping: { ...getShippingData(store) },
    payment: { ...getPaymentData(store) },
  }
}
