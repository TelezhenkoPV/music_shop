import axios from 'axios'

export const getDataFromServe = async (link) => {
  axios(link)
    .then((response) => response.data)
    .catch((e) => console.log(e))
}

export const createUrlWithManyValues = (linkBase, urlKey, array) => {
  return `${linkBase}?${urlKey}=${array.join(',')}`
}
