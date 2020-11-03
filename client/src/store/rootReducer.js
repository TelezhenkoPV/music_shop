import { combineReducers } from 'redux'
import user from './user/userReducer'
import testReducer from './test_store/testReducer'
import modalReducer from './modal/modalReducer'
import filters from './filters/filtersReducer'

const rootReducer = combineReducers({
  user,
  product: testReducer,
  modalStatus: modalReducer,
  filters,
})

export default rootReducer
