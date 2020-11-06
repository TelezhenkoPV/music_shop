import {
  ENQUEUE_SNACKBAR,
  CLOSE_SNACKBAR,
  REMOVE_SNACKBAR,
} from './notificationConstants'

export const enqueueSnackbar = (notification) => {
  const key = notification.options && notification.options.key

  return {
    type: ENQUEUE_SNACKBAR,
    notification: {
      ...notification,
      key: key || new Date().getTime() + Math.random(),
    },
  }
}

export const closeSnackbar = (key) => ({
  type: CLOSE_SNACKBAR,
  dismissAll: !key,
  key,
})

export const removeSnackbar = (key) => ({
  type: REMOVE_SNACKBAR,
  key,
})

export const notificate = ({ variant = 'default', data = null }) => (
  dispatch
) => {
  if (data) {
    const options = {
      variant,
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'center',
      },
    }

    if (typeof data === 'object') {
      console.log('data object')
      if (Array.isArray(data)) {
        data.forEach((message) => {
          dispatch(
            enqueueSnackbar({
              message: `${JSON.stringify(message)}.`,
              options,
            })
          )
        })
      } else {
        for (const key in data) {
          dispatch(
            enqueueSnackbar({
              message: `${JSON.stringify(data[key])}.`,
              options,
            })
          )
        }
      }
    } else {
      dispatch(
        enqueueSnackbar({
          message: data,
          options,
        })
      )
    }
  }
}
