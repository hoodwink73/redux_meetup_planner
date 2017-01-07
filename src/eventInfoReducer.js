export const eventInfoReducer = (state={}, action) => {
  switch(action.type){
    case 'ADD_EVENT':
      return {
        eventName: action.eventName,
        eventDate: action.eventDate,
        eventTime: action.eventTime,
        eventType: action.eventType,
        eventHost: action.eventHost,
        eventCreator: action.eventCreator,
        eventLocation: action.eventLocation,
        eventGuests: action.eventGuests,
        eventDescription: action.eventDescription
      }
    default:
      return state
}
}
