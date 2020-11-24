export const addProductToBasket = (products) => (dispatch) =>
  dispatch({
    type: 'ADD_PRODUCT_TO_BASKET',
    payload: products,
  })

export const removeCartItem = (_id) => (dispatch) =>
  dispatch({
    type: 'REMOVE_CART_ITEM',
    payload: _id,
  })

export const plusItem = (_id) => (dispatch) =>
  dispatch({
    type: 'PLUS_CART_ITEM',
    payload: _id,
  })

export const minusItem = (_id) => (dispatch) =>
  dispatch({
    type: 'MINUS_CART_ITEM',
    payload: _id,
  })

export const clean = () => (dispatch) => dispatch({ type: 'CLEAN' })
