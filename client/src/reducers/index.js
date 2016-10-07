import {REQUEST_HELLOS, RECEIVE_HELLOS, ADD_HELLO, ADD_HELLO_SUCCESS} from '../actions'

function hellos(state = {
  isFetching: true,
  items: []
}, action) {
  switch(action.type) {
    case REQUEST_HELLOS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_HELLOS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.items
      })
    case ADD_HELLO:
      let items = state.items.slice()
      return Object.assign({}, state, {
        isFetching: false,
        items: items.unshift(action.hello)
      })
    case ADD_HELLO_SUCCESS:
      return state.items.map(hello => {
        if (hello._id === action.newlyHello._id) {
          return Object.assign({}, hello, {
            id: newlyHello.id
          })
        }
        return hello
      })
    default:
     return state
  }
}

export default helloReducer(state = {}, action) {
  return {
    hellos: hellos(state.hellos, action)
  }
}
