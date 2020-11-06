import { combineReducers } from 'redux'
import user from './user/userReducer'
import testReducer from './test_store/testReducer'
import modalReducer from './modal/modalReducer'
import filters from './filters/filtersReducer'
import slides from './slides/slidesReducer'
import basket from './basket/basketReducer'

const rootReducer = combineReducers({
  user,
  product: testReducer,
  modalStatus: modalReducer,
  filters,
  slides,
  basket,
})

export default rootReducer
