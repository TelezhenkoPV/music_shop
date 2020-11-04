import { SAVE_SLIDES, SLIDES_LOADING } from './slidesConstants'

const initialStore = {
  data: {
    slidesProduct: [],
    slidesCategory: [],
  },
  isLoading: false,
}
const reducer = (store = initialStore, action) => {
  switch (action.type) {
    case SAVE_SLIDES:
      return {
        ...store,
        isLoading: false,
        data: { ...action.payload },
      }
    case SLIDES_LOADING:
      return {
        ...store,
        isLoading: action.payload,
      }
    default:
      return store
  }
}

export default reducer
