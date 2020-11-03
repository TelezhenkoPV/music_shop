import axios from 'axios'
import {
  SAVE_PRODUCT_SLIDES,
  SAVE_CATEGORY_SLIDES,
  SLIDES_LOADING,
} from './slidesConstants'

export const getSlides = () => (dispatch) => {
  dispatch({ type: SLIDES_LOADING, payload: true })
  axios
    .get('http://localhost:5000/api/slides')
    .then((response) => {
      if (response.status === 200) {
        console.log('Slides', response.data)
        const slidesProduct = response.data.filter(
          (slide) => slide.type === 'product'
        )
        const slidesCategory = response.data.filter(
          (slide) => slide.type === 'category'
        )

        axios
          .all(
            slidesProduct.map((slide) => {
              if (slide.productid)
                return axios.get(
                  `http://localhost:5000/api/products/filter?_id=${slide.productid}`
                )
              return null
            })
          )
          .then((response) => {
            // console.log('Response Products', response)
            if (response && response.length > 0) {
              const products = response.map((resProduct) => {
                if (resProduct.status === 200)
                  return resProduct.data.products[0]
                return {}
              })
              // console.log('Slides Product', products)
              const slidesProductFullData = slidesProduct.map((slide) => {
                return {
                  ...slide,
                  product: products.filter(
                    (product) => slide.productid === product._id
                  )[0],
                }
              })
              // console.log('Slides FullData',slidesFullData)
              dispatch({
                type: SAVE_PRODUCT_SLIDES,
                payload: slidesProductFullData,
              })
            }
          })

        axios
          .all(
            slidesCategory.map((slide) => {
              if (slide.categoryid)
                return axios.get(
                  `http://localhost:5000/api/catalog/${slide.categoryid}`
                )
              return null
            })
          )
          .then((response) => {
            console.log('Response Categories', response)
            if (response && response.length > 0) {
              const categories = response.map((resCategory) => {
                if (resCategory.status === 200) return resCategory.data
                return {}
              })
              console.log('Slides Product', categories)
              const slidesCategoryFullData = slidesCategory.map((slide) => {
                return {
                  ...slide,
                  category: categories.filter(
                    (category) => slide.categoryid === category.id
                  ),
                }
              })
              console.log('Slides FullData', slidesCategoryFullData)
              dispatch({
                type: SAVE_CATEGORY_SLIDES,
                payload: slidesCategoryFullData,
              })
            }
          })
          .catch((error) => {
            console.dir('Error loading Carousel data', error)
          })
      }
    })
    .catch((error) => {
      console.dir('Error loading Carousel data', error)
      // dispatch({ type: SLIDES_LOADING, payload: false })
    })
    .finally(() => {
      dispatch({ type: SLIDES_LOADING, payload: false })
    })
}
