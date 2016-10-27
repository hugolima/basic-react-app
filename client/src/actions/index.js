import fetch from 'isomorphic-fetch'
import { validateHelloObject } from 'server/validations'

export const REQUEST_HELLOS = 'REQUEST_HELLOS'
export const RECEIVE_HELLOS = 'RECEIVE_HELLOS'
export const ADD_HELLO = 'ADD_HELLO'
export const ADD_HELLO_SUCCESS = 'ADD_HELLO_SUCCESS'
export const ADD_HELLO_ERROR = 'ADD_HELLO_ERROR'

const isNode = typeof module !== 'undefined' && module.exports
const hellosApiURL = !isNode ? '/api/hellos' : 'http://localhost:3000/api/hellos'

function requestHellos() {
  return {
    type: REQUEST_HELLOS,
  }
}

function receiveHellos(hellosList) {
  return {
    type: RECEIVE_HELLOS,
    hellos: hellosList,
  }
}

function requestAddHello(hello) {
  return {
    type: ADD_HELLO,
    hello,
  }
}

function receiveAddHello(hello, storedId) {
  return {
    type: ADD_HELLO_SUCCESS,
    hello,
    storedId,
  }
}

function receiveAddHelloError(hello) {
  return {
    type: ADD_HELLO_ERROR,
    hello,
  }
}

function handleError(resp) {
  if (!resp.ok) {
    throw new Error(resp.status)
  }
  return resp
}

export function fetchHellos() {
  return (dispatch) => {
    dispatch(requestHellos())
    return fetch(hellosApiURL)
      .then(handleError)
      .then(resp => resp.json())
      .then(json => dispatch(receiveHellos(json)))
      .catch(error => !isNode && console.log(error))
  }
}

export function addHello(hello, validationErrorsFn) {
  return (dispatch) => {
    const errors = validateHelloObject(hello)

    if (errors.length > 0) {
      setTimeout(validationErrorsFn(errors), 0)
      return Promise.resolve()
    }

    dispatch(requestAddHello(hello))

    return fetch(hellosApiURL, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(hello),
    })
    .then(handleError)
    .then(resp => resp.json())
    .then(jsonNewlyHello => dispatch(receiveAddHello(hello, jsonNewlyHello.id)))
    .catch(error => dispatch(receiveAddHelloError(hello)))
  }
}
