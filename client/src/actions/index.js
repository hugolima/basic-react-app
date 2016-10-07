
import fetch from 'isomorphic-fetch'

const hellosApi = '/api/hellos'

export const REQUEST_HELLOS = 'REQUEST_HELLOS'
export const RECEIVE_HELLOS = 'RECEIVE_HELLOS'
export const ADD_HELLO = 'ADD_HELLO'
export const ADD_HELLO_SUCCESS = 'ADD_HELLO_SUCESS'

function requestHellos() {
  return {
    type: REQUEST_HELLOS
  }
}

function receiveHellos(hellosList) {
  return {
    type: RECEIVE_HELLOS
    hellos: hellosList
  }
}

function addHello(hello) {
  return {
    type: ADD_HELLO,
    hello
  }
}

function addHelloSuccess(newlyHello) {
  return {
    type: ADD_HELLO_SUCCESS
    newlyHello
  }
}

export function fetchHellos() {
  return dispatch => {
    dispatch(requestHellos())
    return fetch(hellosApi)
        .then(resp => resp.json())
        .then(json => dispatch(receiveHellos(json)))
  }
}

export function addHello(hello) {
  return dispatch => {
    dispatch(addHello(hello))
    return fetch(hellosApi, {
          method: 'POST',
          body: JSON.stringify(hello)
        })
        .then(resp => resp.json())
        .then(json => dispatch(addHelloSuccess(json)))
  }
}
