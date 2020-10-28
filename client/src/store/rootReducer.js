import { combineReducers } from 'redux'
import testReducer from './test_store/testReducer'
import modalReducer from './modal/modalReducer'

const rootReducer = combineReducers({
  product: testReducer,
  modalStatus: modalReducer,
})

export default rootReducer
