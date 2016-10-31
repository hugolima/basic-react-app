import deepFreeze from 'deep-freeze'
import rootReducer from '../../reducers'
import {
  REQUEST_HELLOS, RECEIVE_HELLOS,
  ADD_HELLO, ADD_HELLO_SUCCESS, ADD_HELLO_ERROR
} from '../../actions'

describe('hello reducers', () => {
  it('should return the initial state', () => {
    expect(
      rootReducer(undefined, {})
    ).toEqual({
      hello: {
        isFetching: false,
        items: []
      }
    })
  })

  it('should handle REQUEST_HELLOS', () => {
    expect(
      rootReducer(undefined, {type: REQUEST_HELLOS})
    ).toEqual({
      hello: {
        isFetching: true,
        items: []
      }
    })
  })

  it('should handle RECEIVE_HELLOS', () => {
    expect(
      rootReducer(undefined, {
        type: RECEIVE_HELLOS,
        hellos: [{id:1, name:'Test 01', date:'Mon Oct 10 2016 00:00:00 GMT-0200 (BRST)'}]
      })
    ).toEqual({
      hello: {
        isFetching: false,
        items: [{id:1, name:'Test 01', date:'Mon Oct 10 2016 00:00:00 GMT-0200 (BRST)'}]
      }
    })
  })

  it('should handle ADD_HELLO', () => {
    const initialState = {
      hello: {
        isFetching: false,
        items: [{id:1, name:'Test 01', date:'Mon Oct 10 2016 00:00:00 GMT-0200 (BRST)'}]
      }
    }

    const resultState = {
      hello: {
        isFetching: false,
        items: [
          {id:0, id_temp:123, name:'Test 02', date:'Mon Oct 11 2016 00:00:00 GMT-0200 (BRST)'},
          {id:1, name:'Test 01', date:'Mon Oct 10 2016 00:00:00 GMT-0200 (BRST)'}
        ]
      }
    }

    deepFreeze(initialState)

    expect(
      rootReducer(initialState, {
        type: ADD_HELLO,
        hello: {id:0, id_temp:123, name:'Test 02', date:'Mon Oct 11 2016 00:00:00 GMT-0200 (BRST)'}
      })
    ).toEqual(resultState)
  })

  it('should handle ADD_HELLO_SUCCESS', () => {
    const helloAddedWithoutID = {id:0, id_temp:123, name:'Test 02', date:'Mon Oct 11 2016 00:00:00 GMT-0200 (BRST)'}
    const initialState = {
      hello: {
        isFetching: false,
        items: [
          helloAddedWithoutID,
          {id:1, name:'Test 01', date:'Mon Oct 10 2016 00:00:00 GMT-0200 (BRST)'}
        ]
      }
    }

    const resultState = {
      hello: {
        isFetching: false,
        items: [
          {id:2, id_temp:123, name:'Test 02', date:'Mon Oct 11 2016 00:00:00 GMT-0200 (BRST)'},
          {id:1, name:'Test 01', date:'Mon Oct 10 2016 00:00:00 GMT-0200 (BRST)'}
        ]
      }
    }

    deepFreeze(initialState)

    expect(
      rootReducer(initialState, {
        type: ADD_HELLO_SUCCESS,
        hello: helloAddedWithoutID,
        storedId: 2
      })
    ).toEqual(resultState)
  })

  it('should handle ADD_HELLO_ERROR', () => {
    const helloAdded = {id:0, id_temp:123, name:'Test 02', date:'Mon Oct 11 2016 00:00:00 GMT-0200 (BRST)'}
    const initialState = {
      hello: {
        isFetching: false,
        items: [
          helloAdded,
          {id:1, name:'Test 01', date:'Mon Oct 10 2016 00:00:00 GMT-0200 (BRST)'}
        ]
      }
    }

    const resultState = {
      hello: {
        isFetching: false,
        items: [
          {id:1, name:'Test 01', date:'Mon Oct 10 2016 00:00:00 GMT-0200 (BRST)'}
        ]
      }
    }

    deepFreeze(initialState)

    expect(
      rootReducer(initialState, {
        type: ADD_HELLO_ERROR,
        hello: helloAdded
      })
    ).toEqual(resultState)
  })
})
