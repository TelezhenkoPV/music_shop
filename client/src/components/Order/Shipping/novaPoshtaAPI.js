import axios from 'axios'
import { notificate } from '../../../store/notification/notificationActions'

export default function getNovaposhtaAPI({
  type,
  filter,
  setOptions,
  setLoading,
  dispatch,
}) {
  setLoading(true)

  const token = axios.defaults.headers.common.Authorization
  delete axios.defaults.headers.common.Authorization

  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const request = (() => {
    switch (type) {
      case 'city':
        return {
          modelName: 'Address',
          calledMethod: 'getCities',
          methodProperties: {
            FindByString: filter,
            // "Page": 1,
            // "Limit": 10
          },
        }
      case 'warehouse':
        return {
          modelName: 'AddressGeneral',
          calledMethod: 'getWarehouses',
          methodProperties: {
            CityName: filter,
          },
        }
      default:
        return null
    }
  })()

  request &&
    axios
      .post('https://api.novaposhta.ua/v2.0/json/', request, options)
      .then(({ status, data: { success, data, errors } }) => {
        if ((status === 200) & success) {
          const list = data.map((item) => item.DescriptionRu)
          setOptions(list)
        } else {
          console.log('Errors', errors)
          dispatch(notificate({ variant: 'error', data: errors }))
        }
      })
      .catch((response) => {
        dispatch(
          notificate({
            variant: 'error',
            data: 'Error connect to NovaPoshta API',
          })
        )
      })
      .finally(() => {
        axios.defaults.headers.common.Authorization = token
        setLoading(false)
      })
}
