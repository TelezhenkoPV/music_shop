import axios from 'axios'
import { SAVE_SLIDES, SLIDES_LOADING } from './slidesConstants'
import { notificate } from '../notification/notificationActions'

export const getSlides = () => (dispatch) => {
  dispatch({ type: SLIDES_LOADING, payload: true })
  axios
    .get('/api/slides')
    .then((response) => {
      if (response.status === 200) {
        const slidesProduct = response.data
          .filter((slide) => 'product' in slide)
          .map((slide) => {
            return { ...slide, slideUrl: `/product/${slide.product.itemNo}` }
          })
        const slidesCategory = response.data
          .filter((slide) => 'category' in slide)
          .map((slide) => {
            const slideUrl =
              slide.category.parentId === 'null'
                ? `/${slide.category.id}`
                : `/${slide.category.parentId}/${slide.category.id}`
            return { ...slide, slideUrl }
          })
        dispatch({
          type: SAVE_SLIDES,
          payload: {
            slidesProduct: [...slidesProduct],
            slidesCategory: [...slidesCategory],
          },
        })
      }
    })
    .catch((error) => {
      dispatch(notificate({ variant: 'error', data: error.message }))
    })
    .finally(() => {
      dispatch({ type: SLIDES_LOADING, payload: false })
    })
}
