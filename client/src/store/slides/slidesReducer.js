import {
  SAVE_PRODUCT_SLIDES,
  SAVE_CATEGORY_SLIDES,
  SLIDES_LOADING,
} from './slidesConstants'

const initialStore = {
  data: {
    productSlides: [],
    categorySlides: [],
  },
  isLoading: false,
}
const reducer = (store = initialStore, action) => {
  switch (action.type) {
    case SAVE_PRODUCT_SLIDES:
      return {
        ...store,
        isLoading: false,
        data: {
          ...store.data,
          productSlides: action.payload,
        },
      }
    case SAVE_CATEGORY_SLIDES:
      return {
        ...store,
        isLoading: false,
        data: {
          ...store.data,
          categorySlides: action.payload,
        },
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
