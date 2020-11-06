import {
  FILTER_CLEAR_CATEGORIES_CHECKBOXES,
  FILTERS_GET_DATA,
  FILTERS_SET_CATEGORY,
  FILTER_CLEAR_CATEGORIES,
  FILTERS_TOGGLE_CATEGORY,
  FILTER_TOGGLE_CATEGORY_CHECKBOX,
  FILTER_SET_PRODUCTS_DATA,
  FILTER_SET_PRICE_INTERVAL,
  FILTER_SET_NON_SORTED_PRODUCTS,
} from '../actionTypes'

const initialStore = {
  loading: false,
  categories: [],
  data: [],
  categoriesCheckboxes: {
    gitar: false,
    booster: false,
    percussion: false,
    bass: false,
    keybords: false,
    accessories: false,
  },
  _notFiltredData: {
    products: [],
    productsQuantity: 0,
  },
  pricesInterval: [0, 2000],
}

const reducer = (store = initialStore, action) => {
  switch (action.type) {
    case FILTER_SET_PRICE_INTERVAL:
      return { ...store, pricesInterval: action.payload }
    case FILTERS_GET_DATA:
      return {
        ...store,
        data: action.payload,
        _notFiltredData: action.payload,
      }
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
    case FILTER_CLEAR_CATEGORIES_CHECKBOXES:
      for (const key in store.categoriesCheckboxes) {
        store.categoriesCheckboxes[key] = false
      }
      return {
        ...store,
        categoriesCheckboxes: {
          ...store.categoriesCheckboxes,
        },
      }
    case FILTER_SET_PRODUCTS_DATA:
      return {
        ...store,
        data: {
          products: action.payload.products,
          productsQuantity: action.payload.productsQuantity,
        },
      }
    case FILTER_TOGGLE_CATEGORY_CHECKBOX:
      return {
        ...store,
        // categories: store.categories,
        categoriesCheckboxes: {
          ...store.categoriesCheckboxes,
          [action.payload]: !store.categoriesCheckboxes[action.payload],
        },
      }
    case FILTER_SET_NON_SORTED_PRODUCTS:
      return {
        ...store,
        _notFiltredData: {
          products: action.payload.products,
          productsQuantity: action.payload.productsQuantity,
        },
      }
    default:
      return store
  }
}

export default reducer
