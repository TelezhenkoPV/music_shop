import { combineReducers } from 'redux'
import user from './user/userReducer'
import modalReducer from './modal/modalReducer'
import filters from './filters/filtersReducer'
import slides from './slides/slidesReducer'
import notification from './notification/notificationReducer'
import basket from './basket/basketReducer'
import search from './search/searchReducer'
import order from './order/orderReducer'
import catalog from './categories/categoriesReducer'
import favorites from './favorites/favoritesReducer'

const rootReducer = combineReducers({
  user,
  modalStatus: modalReducer,
  filters,
  slides,
  notification,
  basket,
  search,
  order,
  catalog,
  favorites,
})

export default rootReducer
