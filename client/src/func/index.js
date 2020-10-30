import axios from 'axios'

export const getDataFromServe = (link) => {
  axios(link)
    .then((response) => console.log(response.data))
    .catch((e) => console.log(e))
}
