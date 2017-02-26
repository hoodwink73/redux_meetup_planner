export const otherEventsReducer = (state={isFetching: false, otherEvents: [ ]}, action) => {
  switch(action.type){
    case 'REQUEST_EVENTS':
      return (
        Object.assign({}, state, { isFetching: true})
      )
    case 'RECEIVE_EVENTS':
      return (
        Object.assign({}, state, {isFetching: false, otherEvents: action.otherEvents})
      )
    default:
      return state
}
}
