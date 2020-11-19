const initialStore = {
  products: [],
  totalPrice: 0,
  totalCount: 0,
}

const reducer = (store = initialStore, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT_TO_BASKET': {
      if (store.products.find((item) => item._id === action.payload._id)) {
        console.log('+1 item for', action.payload._id)
      } else {
        console.log('Add item to cart')
        // store.products.push(action.payload)
      }

      return {
        ...store,
        products: [...store.products, action.payload],
        totalPrice: store.totalPrice + action.payload.currentPrice,
        totalCount: store.totalCount + 1,
      }
    }
    case 'REMOVE_CART_ITEM': {
      return { ...store }
    }
    case 'PLUS_CART_ITEM':
      return { ...store }
    case 'MINUS_CART_ITEM':
      return { ...store }
    default:
      return store
  }
}

export default reducer
