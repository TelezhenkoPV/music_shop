import axios from 'axios'
import { SET_CATALOG } from '../actionTypes'

export const loadCatalog = (data) => (dispatch) => {
  axios('http://localhost:5000/api/catalog').then((res) => {
    dispatch({ type: SET_CATALOG, payload: res.data })
  })
}
