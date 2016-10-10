import fetch from 'isomorphic-fetch'

const hellosApi = '/api/hellos'

export const REQUEST_HELLOS = 'REQUEST_HELLOS'
export const RECEIVE_HELLOS = 'RECEIVE_HELLOS'
export const ADD_HELLO = 'ADD_HELLO'
export const ADD_HELLO_SUCCESS = 'ADD_HELLO_SUCESS'
export const ADD_HELLO_ERROR = 'ADD_HELLO_ERROR'

function requestHellos() {
  return {
    type: REQUEST_HELLOS
  }
}

function receiveHellos(hellosList) {
  return {
    type: RECEIVE_HELLOS,
    hellos: hellosList
  }
}

function requestAddHello(hello) {
  return {
    type: ADD_HELLO,
    hello
  }
}

function receiveAddHello(newlyHello) {
  return {
    type: ADD_HELLO_SUCCESS,
    newlyHello
  }
}

function receiveErrorAddHello(hello) {
  return {
    type: ADD_HELLO_ERROR,
    hello
  }
}

function handleError(resp) {
  if (!resp.ok) {
    throw new Error(resp.status)
  }
  return resp
}

export function fetchHellos() {
  return dispatch => {
    dispatch(requestHellos())
    return fetch(hellosApi)
      .then(resp => resp.json())
      .then(json => dispatch(receiveHellos(json)))
      .catch(error => console.log(error))
  }
}

export function addHello(hello) {
  return dispatch => {
    dispatch(requestAddHello(hello))
    return fetch(hellosApi, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(hello)
      })
      .then(handleError)
      .then(resp => resp.json())
      .then(json => dispatch(receiveAddHello(json)))
      .catch(error => {
        dispatch(receiveErrorAddHello(hello))
        console.log(error)
      })
  }
}
