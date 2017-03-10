import rootReducer from './rootReducer'
import {addUser, addEvent} from '../actions.js'

describe('reducers', () => {
  it('should return state with new user added', () => {
    const previousState = {
                            userInfo: {},
                            featuredEventInfo: {},
                            otherEvents:{ isFetching: false, otherEvents: []}
                          }
    let state
    state = rootReducer( previousState,
                         addUser('a user', 'auser@gmail.com', 'Password1!'))

    expect(state).toEqual({
       userInfo:{ username:'a user',
       email:'auser@gmail.com',
       password:'Password1!'},
       featuredEventInfo:{},
       otherEvents: { isFetching: false, otherEvents: [] }
    })

  })

  it('should return state with new event added', () => {
    const previousState = { userInfo:{ username:'a user', email:'auser@gmail.com', password:'Password1!'}, featuredEventInfo:{}, otherEvents: { isFetching: false, otherEvents:[]}}
    let state

    state = rootReducer( previousState,
                      addEvent('an event name',
                               '2017-03-31T04:00:00.000Z',
                               '2017-03-31T22:00:00.000Z',
                               'a party', 'madison sq',
                               {}, // Location
                               ['guest 1','guest 2'],
                               'event description...'))

    expect(state).toEqual({ userInfo:{username:'a user',email:'auser@gmail.com',password:'Password1!'},
                            featuredEventInfo:{eventName:'an event name',eventDate:'2017-03-31T04:00:00.000Z',eventTime:'2017-03-31T22:00:00.000Z',eventType:'a party',eventHost:'madison sq',eventLocation:{},eventGuests:['guest 1','guest 2'],eventDescription:'event description...'},
                            otherEvents:{isFetching:false,otherEvents:[]}
                          })
  })
})
