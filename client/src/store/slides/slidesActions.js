import axios from 'axios'
import { SAVE_SLIDES, SLIDES_LOADING } from './slidesConstants'

export const getSlides = () => (dispatch) => {
  dispatch({ type: SLIDES_LOADING, payload: true })
  axios
    .get('http://localhost:5000/api/slides')
    .then((response) => {
      if (response.status === 200) {
        // console.log('Slides', response.data)
        const slidesProduct = response.data
          .filter((slide) => 'product' in slide)
          .map((slide) => {
            return { ...slide, slideUrl: slide.product.productUrl }
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
        // console.log('Product Slides',slidesProduct)
        // console.log('Category Slides',slidesCategory)
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
      console.dir('Error loading Carousel data', error)
    })
    .finally(() => {
      dispatch({ type: SLIDES_LOADING, payload: false })
    })
}
