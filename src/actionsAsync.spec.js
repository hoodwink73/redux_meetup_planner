/*
import configureMockStore from 'redux-mock-store'
import nock from 'nock'
import thunk from 'redux-thunk'
import {requestEvents, receiveEvents, fetchOtherEvents} from './actions.js'

const middleawares = [thunk]
const mockStore = configureMockStore(middleawares)

describe('aync actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('dispatches receive events when other events have been successfully fetched', () => {
    nock('http://example.com/')
      .get('/otherEvents')
      .reply(200, {otherEvents: []})
  })
})
*/
