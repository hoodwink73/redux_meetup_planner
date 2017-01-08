import axios from 'axios'

export const addUser = (username, email, password) => {
  return {
    type: 'ADD_USER',
    username,
    email,
    password
  }
}

export const addEvent = (    eventName, eventDate, eventTime,
                             eventType, eventHost, eventCreator,
                             eventLocation, eventGuests, eventDescription  ) => {
  return {
    type: 'ADD_EVENT',
    eventName,
    eventDate,
    eventTime,
    eventType,
    eventHost,
    eventCreator,
    eventLocation,
    eventGuests,
    eventDescription
  }
}

const requestEvents = ( ) => {
  return {
    type: 'REQUEST_EVENTS'
  }
}

const receiveEvents = (fetchedData) => {
  return {
    type: 'RECEIVE_EVENTS',
    otherEvents: fetchedData
  }
}

export const fetchOtherEvents = () => {
  return (dispatch) => {
    dispatch(requestEvents())
    return (
      axios.get('./otherEvents.json')
        .then(
          res => (
            dispatch(
              receiveEvents(res.data.otherEvents)
            )
          )
        )
    )
  }
}
