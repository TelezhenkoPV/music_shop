import { FILTERS_SET_PARSED_FILTERS_PARAMS } from '../actionTypes'

const initialStore = {
  loading: false,
  actualFilters: {},
}

const reducer = (store = initialStore, action) => {
  switch (action.type) {
    case FILTERS_SET_PARSED_FILTERS_PARAMS:
      return { ...store, actualFilters: action.payload }
    default:
      return store
  }
}

export default reducer
