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
  colors = null,
  pageNumber = null
) => {
  if (pageNumber !== null && colors !== null) {
    return `${link}=${categoriesArray.join(
      ','
    )}&minPrice=${minPrice}&maxPrice=${maxPrice}&color=${colors}&perPage=2&startPage=${pageNumber}`
  }
  if (pageNumber !== null) {
    return `${link}=${categoriesArray.join(
      ','
    )}&minPrice=${minPrice}&maxPrice=${maxPrice}&perPage=2&startPage=${pageNumber}`
  }
  if (colors !== null) {
    return `${link}=${categoriesArray.join(
      ','
    )}&minPrice=${minPrice}&maxPrice=${maxPrice}&color=${colors}`
  }
  return `${link}=${categoriesArray.join(
    ','
  )}&minPrice=${minPrice}&maxPrice=${maxPrice}`
}
