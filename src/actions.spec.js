import {addUser, addEvent} from './actions.js'

describe('synchronous actions', () => {

  it('should add user', () => {
    const expectedAction = {
      type: 'ADD_USER',
      username: 'a user',
      email: 'auser@gmail.com',
      password: 'Password1!'
    }

    expect(addUser('a user', 'auser@gmail.com', 'Password1!'))
              .toEqual(expectedAction)
  })

  it('should add event', () => {
    const expectedAction = {
      type: 'ADD_EVENT',
      eventName: 'event name',
      eventDate: 'event date',
      eventTime: 'event time',
      eventType: 'event type',
      eventHost: 'event host',
      eventLocation: 'event location',
      eventGuests: 'event guests',
      eventDescription: 'event description'
    }

    expect(addEvent('event name',
                    'event date',
                    'event time',
                    'event type',
                    'event host',
                    'event location',
                    'event guests',
                    'event description')).toEqual(expectedAction)
  })
})
