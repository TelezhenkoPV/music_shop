// Order Stepper
export const getActiveStep = (store) => store.order.activeStep

// Customer
export const getIsCustomerSet = (store) => store.order.isCustomerSet
export const getCustomerData = (store) => store.order.customer

// Shipping
export const getShippingMethod = (store) => store.order.shipping.type

export const getIsAddressDeliverySet = (store) =>
  store.order.shipping.addressDelivery.isShippingSet
export const getAddressDeliveryData = (store) =>
  store.order.shipping.addressDelivery.data

export const getIsNovaPoshtaSet = (store) =>
  store.order.shipping.novaPoshta.isShippingSet
export const getNovaPoshtaData = (store) => store.order.shipping.novaPoshta.data

// Payment
export const getIsPaymentSet = (store) => store.order.isPaymentSet
export const getPaymentData = (store) => store.order.payment
