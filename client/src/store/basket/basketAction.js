export const addProductToBasket = (obj) => (dispatch) =>
  dispatch({
    type: 'ADD_PRODUCT_TO_BASKET',
    payload: obj,
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
