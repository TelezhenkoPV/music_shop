import { FILTERS_GET_DATA } from '../actionTypes'

const initialStore = {
  loading: false,
  data: [],
}

const reducer = (store = initialStore, action) => {
  switch (action.type) {
    case FILTERS_GET_DATA:
      return { ...store, data: action.payload }
    default:
      return store
  }
}

export default reducer
