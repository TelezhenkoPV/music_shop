import {
  ENQUEUE_SNACKBAR,
  CLOSE_SNACKBAR,
  REMOVE_SNACKBAR,
} from './notificationConstants'

const initialStore = {
  notifications: [],
}

const reducer = (store = initialStore, action) => {
  switch (action.type) {
    case ENQUEUE_SNACKBAR:
      return {
        ...store,
        notifications: [
          ...store.notifications,
          {
            key: action.key,
            ...action.notification,
          },
        ],
      }

    case CLOSE_SNACKBAR:
      return {
        ...store,
        notifications: store.notifications.map((notification) =>
          action.dismissAll || notification.key === action.key
            ? { ...notification, dismissed: true }
            : { ...notification }
        ),
      }

    case REMOVE_SNACKBAR:
      return {
        ...store,
        notifications: store.notifications.filter(
          (notification) => notification.key !== action.key
        ),
      }

    default:
      return store
  }
}

export default reducer
