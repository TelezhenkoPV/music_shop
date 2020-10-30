import axios from 'axios'
import { FILTERS_GET_DATA } from '../actionTypes'
const qs = require('qs')

export const getDataForFilterAction = (data) => (dispatch) => {
  // dispatch({ type: LOADING_DATA, payload: true })
  axios(`http://localhost:5000/api/products/filter?${qs.stringify(data)}`).then(
    (res) => {
      dispatch({ type: FILTERS_GET_DATA, payload: res.data })
      // dispatch({ type: LOADING_DATA, payload: false })
    }
  )
}
