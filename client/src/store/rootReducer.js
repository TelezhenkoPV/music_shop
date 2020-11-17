import { combineReducers } from 'redux'
import user from './user/userReducer'
import testReducer from './test_store/testReducer'
import modalReducer from './modal/modalReducer'
import filters from './filters/filtersReducer'
import slides from './slides/slidesReducer'
import notification from './notification/notificationReducer'
import basket from './basket/basketReducer'
import search from './search/searchReducer'
import catalog from './categories/categoriesReducer'

const rootReducer = combineReducers({
  user,
  product: testReducer,
  modalStatus: modalReducer,
  filters,
  slides,
  notification,
  basket,
  search,
  catalog,
})

export default rootReducer
