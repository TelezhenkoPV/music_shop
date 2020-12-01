import { FAVORITES_PROCEED, SAVE_FAVORITES } from './favoritesConstants'

const initialStore = {
  isProceed: false,
  data: {
    products: [],
  },
}

const reducer = (store = initialStore, action) => {
  switch (action.type) {
    case FAVORITES_PROCEED:
      return {
        ...store,
        isProceed: action.payload,
      }
    case SAVE_FAVORITES:
      return {
        ...store,
        data: action.payload,
      }
    default:
      return store
  }
}

export default reducer
