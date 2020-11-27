const initialStore = {
  products: [],
  totalPrice: 0,
  totalCount: 0,
}

const reducer = (store = initialStore, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT_TO_BASKET': {
      const productObj = {
        _id: action.payload._id,
        product: action.payload,
        cartQuantity: 1,
        productPrice: action.payload.currentPrice,
      }

      let alreadyExist = false
      store.products.forEach((elem) => {
        if (elem._id === action.payload._id) {
          alreadyExist = true
          elem.cartQuantity++
          elem.productPrice = elem.cartQuantity * action.payload.currentPrice
        }
      })

      if (!alreadyExist) {
        store.products.push(productObj)
      }

      return {
        ...store,
        products: [...store.products],
        totalPrice: store.totalPrice + action.payload.currentPrice,
        totalCount: store.totalCount + 1,
      }
    }
    case 'REMOVE_CART_ITEM': {
      const cartItems = store.products
        .slice()
        .filter((elem) => elem._id !== action.payload._id)
      return {
        ...store,
        products: cartItems,
        totalCount: store.totalCount - action.payload.cartQuantity,
        totalPrice: store.totalPrice - action.payload.productPrice,
      }
    }
    case 'PLUS_CART_ITEM': {
      const tempCart = store.products.map((cartItem) => {
        if (
          cartItem._id === action.payload._id &&
          cartItem.cartQuantity < action.payload.product.quantity
        ) {
          cartItem = {
            ...cartItem,
            cartQuantity: cartItem.cartQuantity + 1,
            productPrice:
              cartItem.productPrice + action.payload.product.currentPrice,
          }
        }
        return cartItem
      })

      let totalValue = true
      // eslint-disable-next-line array-callback-return
      store.products.map((cartItem) => {
        if (
          cartItem._id === action.payload._id &&
          cartItem.cartQuantity < action.payload.product.quantity
        ) {
          totalValue = false
        }
      })

      return {
        ...store,
        products: tempCart,
        totalCount: !totalValue ? store.totalCount + 1 : store.totalCount,
        totalPrice: !totalValue
          ? store.totalPrice + action.payload.product.currentPrice
          : store.totalPrice,
      }
    }
    case 'MINUS_CART_ITEM': {
      const tempCart = store.products.map((cartItem) => {
        if (
          cartItem._id === action.payload._id &&
          action.payload.cartQuantity > 1
        ) {
          cartItem = {
            ...cartItem,
            cartQuantity: cartItem.cartQuantity - 1,
            productPrice:
              cartItem.productPrice - action.payload.product.currentPrice,
          }
        }
        return cartItem
      })

      let totalValue = true
      // eslint-disable-next-line array-callback-return
      store.products.map((cartItem) => {
        if (
          cartItem._id === action.payload._id &&
          action.payload.cartQuantity > 1
        ) {
          totalValue = false
        }
      })

      return {
        ...store,
        products: tempCart,
        totalCount: !totalValue ? store.totalCount - 1 : store.totalCount,
        totalPrice: !totalValue
          ? store.totalPrice - action.payload.product.currentPrice
          : store.totalPrice,
      }
    }
    case 'CLEAN':
      return { ...initialStore }
    default:
      return store
  }
}

export default reducer
