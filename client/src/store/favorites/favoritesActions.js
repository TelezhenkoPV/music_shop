import axios from 'axios'
import { notificate } from '../notification/notificationActions'
import { FAVORITES_PROCEED, SAVE_FAVORITES } from './favoritesConstants'

export const getFavorites = () => (dispatch) => {
  dispatch({ type: FAVORITES_PROCEED, payload: true })
  axios
    .get('/api/wishlist')
    .then((response) => {
      if (response.status === 200) {
        const { data } = response
        dispatch({ type: SAVE_FAVORITES, payload: data || { products: [] } })
      }
    })
    .catch(({ response: { data } }) => {
      dispatch(notificate({ variant: 'error', data: data.message }))
    })
    .finally(() => {
      dispatch({ type: FAVORITES_PROCEED, payload: false })
    })
}

export const toggleFavorites = (isInFavorites, prodictId) => (dispatch) => {
  dispatch({ type: FAVORITES_PROCEED, payload: true })
  const options = {
    method: isInFavorites ? 'delete' : 'put',
  }
  axios(`/api/wishlist/${prodictId}`, options)
    .then((response) => {
      if (response.status === 200) {
        const { data } = response
        dispatch({ type: SAVE_FAVORITES, payload: data })
      }
    })
    .catch(({ response: { data } }) => {
      dispatch(notificate({ variant: 'error', data: data.message }))
    })
    .finally(() => {
      dispatch({ type: FAVORITES_PROCEED, payload: false })
    })
}
