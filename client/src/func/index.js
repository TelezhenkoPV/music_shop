import axios from 'axios'

export const getDataFromServe = async (link) => {
  axios(link)
    .then((response) => response.data)
    .catch((e) => console.log(e))
}

export const createUrlWithManyValues = (
  categoriesArray,
  minPrice = 0,
  maxPrice = 2500
) => {
  return `http://localhost:5000/api/products/filter?categories=${categoriesArray.join(
    ','
  )}&minPrice=${minPrice}&maxPrice=${maxPrice}`
}
