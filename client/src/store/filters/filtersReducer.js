import {
  FILTERS_GET_DATA,
  FILTERS_SET_CATEGORY,
  FILTER_CLEAR_CATEGORIES,
  FILTERS_TOGGLE_CATEGORY,
  FILTER_SET_PRODUCTS_DATA,
  FILTER_SET_PRICE_INTERVAL,
  FILTERS_SET_PARSED_CATEGORIES,
} from '../actionTypes'

const initialStore = {
  loading: false,
  categories: [],
  data: [],
  pricesInterval: [0, 2000],
}

const reducer = (store = initialStore, action) => {
  switch (action.type) {
    case FILTER_SET_PRICE_INTERVAL:
      return { ...store, pricesInterval: action.payload }
    case FILTERS_GET_DATA:
      return { ...store, data: action.payload }
    case FILTERS_SET_PARSED_CATEGORIES:
      store.categories.push(action.payload)
      return { ...store, categories: store.categories }
    case FILTERS_SET_CATEGORY:
      // eslint-disable-next-line no-case-declarations
      const newCategoriesArr = []
      newCategoriesArr.push(action.payload)
      return { ...store, categories: newCategoriesArr }
    case FILTERS_TOGGLE_CATEGORY:
      // eslint-disable-next-line no-unused-vars,no-case-declarations
      const resultOfSearching = store.categories.find(
        (categoryName) => categoryName === action.payload
      )
      if (!resultOfSearching) {
        store.categories.push(action.payload)
      } else {
        const index = store.categories.findIndex(
          (elem) => elem === action.payload
        )
        store.categories.splice(index, 1)
      }
      return {
        ...store,
        categories: store.categories,
      }
    case FILTER_CLEAR_CATEGORIES:
      return { ...store, categories: [] }
    case FILTER_SET_PRODUCTS_DATA:
      return {
        ...store,
        data: action.payload,
      }
    default:
      return store
  }
}

export default reducer
