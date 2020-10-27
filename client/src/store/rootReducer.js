import { combineReducers } from 'redux'
import user from './user/userReducer'
import testReducer from './test_store/testReducer'

const rootReducer = combineReducers({
  user,
  product: testReducer,
})

export default rootReducer
