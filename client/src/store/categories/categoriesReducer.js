import { SET_CATALOG } from '../actionTypes'

const initialStore = {
  catalog: [],
}

const reducer = (store = initialStore, action) => {
  switch (action.type) {
    case SET_CATALOG:
      return { ...store, catalog: action.payload }
    default:
      return store
  }
}

export default reducer
