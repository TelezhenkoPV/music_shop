// Order Stepper
export const getActiveStep = (store) => store.order.activeStep

// Customer
export const getIsCustomerSet = (store) => store.order.customer.isCustomerSet
export const getCustomerData = (store) => store.order.customer.data

// Shipping
export const getShippingMethod = (store) => store.order.shipping.type
export const getShippingData = (store) => {
  const type = getShippingMethod(store)
  const data = store.order.shipping[getShippingMethod(store).key].data
  return { type, data }
}

export const getIsAddressDeliverySet = (store) =>
  store.order.shipping.addressDelivery.isShippingSet
export const getAddressDeliveryData = (store) => {
  return {
    data: store.order.shipping.addressDelivery.data,
    isAddressFromProfile:
      store.order.shipping.addressDelivery.isAddressFromProfile,
  }
}

export const getIsNovaPoshtaSet = (store) =>
  store.order.shipping.novaPoshta.isShippingSet
export const getNovaPoshtaData = (store) => {
  return {
    data: store.order.shipping.novaPoshta.data,
    isAddressFromProfile: store.order.shipping.novaPoshta.isAddressFromProfile,
  }
}

// Payment
export const getPaymentMethod = (store) => store.order.payment.type
export const getPaymentData = (store) => {
  return {
    type: getPaymentMethod(store),
    data: store.order.payment[getPaymentMethod(store).key].data,
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
