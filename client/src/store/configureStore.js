import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import helloReducer from '../reducers'

export default function configureStore() {
  return createStore(
    helloReducer,
    applyMiddleware(thunkMiddleware))
}
