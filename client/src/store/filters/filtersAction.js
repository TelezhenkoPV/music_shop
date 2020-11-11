import axios from 'axios'
import {
  FILTERS_GET_DATA,
  FILTERS_SET_CATEGORY,
  FILTERS_TOGGLE_CATEGORY,
  FILTER_SET_PRODUCTS_DATA,
  FILTER_SET_PRICE_INTERVAL,
  FILTERS_SET_PARSED_CATEGORIES,
} from '../actionTypes'
const qs = require('qs')

export const getDataForFilterAction = (data) => (dispatch) => {
  // dispatch({ type: LOADING_DATA, payload: true })
  axios(
    `http://localhost:5000/api/products/filter?categories=${qs.stringify(data)}`
  ).then((res) => {
    dispatch({ type: FILTERS_GET_DATA, payload: res.data })
    // dispatch({ type: LOADING_DATA, payload: false })
  })
}

export const setFilterCategoryAction = (categoryName) => (dispatch) => {
  dispatch({ type: FILTERS_SET_CATEGORY, payload: categoryName })
}

export const toggleFilterCategoryAction = (categoryName) => (dispatch) => {
  dispatch({ type: FILTERS_TOGGLE_CATEGORY, payload: categoryName })
}

export const setFilterProductsDataAction = (data) => (dispatch) =>
  dispatch({ type: FILTER_SET_PRODUCTS_DATA, payload: data })

export const setFilterPriceIntervalAction = (newValues) => (dispatch) => {
  dispatch({ type: FILTER_SET_PRICE_INTERVAL, payload: newValues })
}

export const setFilterParsedCategoriesAction = (newCategories) => (
  dispatch
) => {
  dispatch({ type: FILTERS_SET_PARSED_CATEGORIES, payload: newCategories })
}
