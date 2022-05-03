
import { combineReducers, applyMiddleware, createStore } from 'redux'
import { rootReducer } from './modules/reducer'
// import logger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

const combinedReducer = combineReducers({
  base: rootReducer
})

export const setupStore = createStore(combinedReducer,applyMiddleware(thunkMiddleware))
export type AppDispatch = typeof setupStore.dispatch;