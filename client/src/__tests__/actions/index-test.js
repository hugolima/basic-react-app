
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import { minLengthName } from 'server/config.js'
import { fetchHellos, addHello } from '../../actions'
import {
  REQUEST_HELLOS, RECEIVE_HELLOS,
  ADD_HELLO, ADD_HELLO_SUCCESS, ADD_HELLO_ERROR
} from '../../actions'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('hello actions', () => {
  const store = mockStore({hello: {}})

  afterEach(() => {
    nock.cleanAll()
    store.clearActions()
  })

  it('fetch hellos success', () => {
    nock('http://localhost:3000/')
      .get('/api/hellos')
      .reply(200, [{id:1, name:'Test 01', date:'Mon Oct 10 2016 00:00:00 GMT-0200 (BRST)'}])

    const expectedActions = [
      {type: REQUEST_HELLOS},
      {type: RECEIVE_HELLOS, hellos: [{id:1, name:'Test 01', date:'Mon Oct 10 2016 00:00:00 GMT-0200 (BRST)'}]}
    ]

    return store.dispatch(fetchHellos()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('fetch hellos returning http error', () => {
    nock('http://localhost:3000/')
      .get('/api/hellos')
      .reply(500, '')

    const expectedActions = [
      {type: REQUEST_HELLOS}
    ]

    return store.dispatch(fetchHellos()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('add hello success', () => {
    nock('http://localhost:3000/')
      .post('/api/hellos')
      .reply(200, {id:2, name:'Test 02', date:'Mon Oct 10 2016 00:00:00 GMT-0200 (BRST)'})

    const expectedActions = [
      {
        type: ADD_HELLO,
        hello: {id:0, name:'Test 02', date:'Mon Oct 10 2016 00:00:00 GMT-0200 (BRST)'}
      },
      {
        type: ADD_HELLO_SUCCESS,
        hello: {id:0, name:'Test 02', date:'Mon Oct 10 2016 00:00:00 GMT-0200 (BRST)'},
        storedId: 2
      }
    ]

    const newHello = {id:0, name:'Test 02', date:'Mon Oct 10 2016 00:00:00 GMT-0200 (BRST)'}

    return store.dispatch(addHello(newHello)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('add hello returning http error', () => {
    nock('http://localhost:3000/')
      .post('/api/hellos')
      .reply(500, '')

    const expectedActions = [
      {
        type: ADD_HELLO,
        hello: {id:0, name:'Test 02', date:'Mon Oct 10 2016 00:00:00 GMT-0200 (BRST)'}
      },
      {
        type: ADD_HELLO_ERROR,
        hello: {id:0, name:'Test 02', date:'Mon Oct 10 2016 00:00:00 GMT-0200 (BRST)'}
      }
    ]

    const newHello = {id:0, name:'Test 02', date:'Mon Oct 10 2016 00:00:00 GMT-0200 (BRST)'}

    return store.dispatch(addHello(newHello)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('add hello with validation error', () => {
    const newHello = {id:0, name:'Teste 01', date:'Mon Oct 10 2016 00:00:00 GMT-0200 (BRST)'}
    const errorFnEmpty = jest.fn((errors) => {
      expect(errors).toEqual([{id_element:'element_hello_name', message:'Who is giving the hello?'}])
    })
    const errorFnMinimal = jest.fn((errors) => {
      expect(errors).toEqual([{id_element:'element_hello_name', message:`The name must have at least ${minLengthName} characters`}])
    })

    store.dispatch(addHello({...newHello, name: ''}, errorFnEmpty))
    store.dispatch(addHello({...newHello, name: Array.from('A'.repeat(minLengthName - 1))}, errorFnMinimal))

    expect(errorFnEmpty).toHaveBeenCalled()
    expect(errorFnMinimal).toHaveBeenCalled()
  })
})
