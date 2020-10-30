import { combineReducers } from 'redux'
import user from './user/userReducer'
import testReducer from './test_store/testReducer'
import modalReducer from './modal/modalReducer'
import filtersData from './filters/filtersReducer'

const rootReducer = combineReducers({
  user,
  product: testReducer,
  modalStatus: modalReducer,
  filtersData,
})

export default rootReducer
