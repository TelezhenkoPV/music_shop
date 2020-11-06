export const addProductToBasket = (obj) => (dispatch) =>
  dispatch({
    type: 'ADD_PRODUCT_TO_BASKET',
    payload: obj,
  })

export const removeCartItem = (id) => (dispatch) =>
  dispatch({
    type: 'REMOVE_CART_ITEM',
    payload: id,
  })
