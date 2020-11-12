import {
  SAVE_SEARCHDATA,
  SEARCH_LOADING,
  SEARCH_CLEAR,
} from './searchConstants'

const initialStore = {
  searchData: [],
  isLoading: false,
}
const reducer = (store = initialStore, action) => {
  switch (action.type) {
    case SAVE_SEARCHDATA:
      return {
        ...store,
        searchData: [...action.payload],
      }
    case SEARCH_LOADING:
      return {
        ...store,
        isLoading: action.payload,
      }
    case SEARCH_CLEAR:
      return {
        ...initialStore,
      }
    default:
      return store
  }
}

export default reducer
