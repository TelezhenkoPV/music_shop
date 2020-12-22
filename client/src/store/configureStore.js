import { createStore, compose, applyMiddleware } from 'redux'
import rootReducer from './rootReducer'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__
  ? window.__REDUX_DEVTOOLS_EXTENSION__()
  : (f) => f

const persistConfig = {
  key: 'basket',
  storage: storage,
  whitelist: ['basket', 'lastProducts'],
}
const pReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(pReducer, compose(applyMiddleware(thunk), devTools))

const persistor = persistStore(store)

export { store, persistor }
