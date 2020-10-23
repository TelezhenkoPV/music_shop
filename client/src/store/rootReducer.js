import { combineReducers } from 'redux'
import testReducer from './test_store/testReducer'

const rootReducer = combineReducers({
  product: testReducer,
})

export default rootReducer
