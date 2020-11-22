import axios from 'axios'
import { SET_CATALOG } from '../actionTypes'

export const loadCatalog = (data) => (dispatch) => {
  axios('/api/catalog').then((res) => {
    dispatch({ type: SET_CATALOG, payload: res.data })
  })
}
