export const addProductToBasket = (products) => (dispatch) =>
  dispatch({
    type: 'ADD_PRODUCT_TO_BASKET',
    payload: products,
  })

export const removeCartItem = (product) => (dispatch) =>
  dispatch({
    type: 'REMOVE_CART_ITEM',
    payload: product,
  })

export const plusItem = (product) => (dispatch) =>
  dispatch({
    type: 'PLUS_CART_ITEM',
    payload: product,
  })

export const minusItem = (product) => (dispatch) =>
  dispatch({
    type: 'MINUS_CART_ITEM',
    payload: product,
  })

export const clean = () => (dispatch) => dispatch({ type: 'CLEAN' })
