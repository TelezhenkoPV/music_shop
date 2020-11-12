import axios from 'axios'

export const getDataFromServe = async (link) => {
  axios(link)
    .then((response) => response.data)
    .catch((e) => console.log(e))
}

export const createUrlWithManyValues = (
  categoriesArray,
  minPrice = 0,
  maxPrice = 2500,
  link = 'http://localhost:5000/api/products/filter?categories',
  colors = null
) => {
  if (colors !== null) {
    return `${link}=${categoriesArray.join(
      ','
    )}&minPrice=${minPrice}&maxPrice=${maxPrice}&color=${colors}`
  }
  return `${link}=${categoriesArray.join(
    ','
  )}&minPrice=${minPrice}&maxPrice=${maxPrice}`
}
