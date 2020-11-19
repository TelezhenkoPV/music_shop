export const getIsCustomerSet = (store) => store.order.isCustomerSet
export const getIsShippingSet = (store) => store.order.isSshippingSet
export const getIsPaymentSet = (store) => store.order.isPaymentSet

export const getCustomerData = (store) => store.order.customer
export const getShippingData = (store) => store.order.shipping
export const getPaymentData = (store) => store.order.payment
