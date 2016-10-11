import { combineReducers } from 'redux'
import {
  REQUEST_HELLOS, RECEIVE_HELLOS,
  ADD_HELLO, ADD_HELLO_SUCCESS, ADD_HELLO_ERROR
} from '../actions'

const initialHelloState = {
  isFetching: true,
  items: []
}

function hello(state = initialHelloState, action) {
  switch(action.type) {
    case REQUEST_HELLOS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_HELLOS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.hellos
      })
    case ADD_HELLO:
      let newItems = state.items.slice()
      newItems.unshift(action.hello)

      return Object.assign({}, state, {
        isFetching: false,
        items: newItems
      })
    case ADD_HELLO_SUCCESS:
      let itemsUpdated = state.items.map(item => {
        if (item._id === action.newlyHello._id) {
          return Object.assign({}, item, {
            id: action.newlyHello.id
          })
        }
        return item
      })

      return Object.assign({}, state, {
        isFetching: false,
        items: itemsUpdated
      })
    case ADD_HELLO_ERROR:
        let itemsFiltered = state.items.filter(item => {
          if (item === action.hello) {
            return false
          }
          return true
        })

        return Object.assign({}, state, {
          isFetching: false,
          items: itemsFiltered
        })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  hello
})

export default rootReducer
