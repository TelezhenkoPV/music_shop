import axios from 'axios'
import {
  SAVE_SEARCHDATA,
  SEARCH_LOADING,
  SEARCH_CLEAR,
} from './searchConstants'
import { notificate } from '../notification/notificationActions'

export const search = (query) => (dispatch) => {
  if (query.length < 3) {
    dispatch(
      notificate({
        variant: 'warning',
        data: 'Search query string too short...',
      })
    )
  } else {
    dispatch({ type: SEARCH_LOADING, payload: true })
    axios
      .post('http://localhost:5000/api/products/search/', { query })
      .then((response) => {
        if (response.status === 200) {
          const searchResult = response.data
          dispatch({ type: SAVE_SEARCHDATA, payload: searchResult })
        }
      })
      .catch((error) => {
        dispatch(
          notificate({
            variant: 'error',
            data: JSON.parse(error.request.response),
          })
        )
      })
      .finally(() => {
        // Фейковая задержка для демонстрации спинера
        setTimeout(() => {
          dispatch({ type: SEARCH_LOADING, payload: false })
        }, 1000)
      })
  }
}

export const clearSearch = () => (dispatch) => {
  dispatch({ type: SEARCH_CLEAR })
}
