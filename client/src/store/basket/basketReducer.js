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
        .filter((elem) => elem._id !== action.payload)

      store.products.forEach((elem) => {
        if (elem._id === action.payload) {
          const totalCount = store.totalCount - elem.cartQuantity
          const totalPrice = store.totalPrice - elem.productPrice

          console.log(`Count: ${totalCount}, Price: ${totalPrice}`)
        }
      })

      return {
        ...store,
        products: cartItems,
      }
    }
    case 'PLUS_CART_ITEM': {
      const tempCart = store.products.map((cartItem) => {
        if (
          cartItem._id === action.payload &&
          cartItem.cartQuantity < cartItem.product.quantity
        ) {
          cartItem = {
            ...cartItem,
            cartQuantity: cartItem.cartQuantity + 1,
            productPrice: cartItem.productPrice + cartItem.product.currentPrice,
          }
        }
        return cartItem
      })

      // const tempTotalCount = store.products.map(cartItem => {
      //   if (cartItem.cartQuantity < cartItem.product.quantity) {
      //     store.totalCount++;
      //   }
      //   return store.totalCount
      // })

      return {
        ...store,
        products: tempCart,
      }
    }
    case 'MINUS_CART_ITEM': {
      const tempCart = store.products.map((cartItem) => {
        if (cartItem._id === action.payload && cartItem.cartQuantity > 1) {
          cartItem = {
            ...cartItem,
            cartQuantity: cartItem.cartQuantity - 1,
            productPrice: cartItem.productPrice - cartItem.product.currentPrice,
          }
        }
        return cartItem
      })

      return {
        ...store,
        products: tempCart,
      }
    }
    case 'CLEAN':
      return { ...initialStore }
    default:
      return store
  }
}

export default reducer
