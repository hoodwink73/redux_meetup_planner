import { combineReducers} from 'redux'
import {userInfoReducer} from './userInfoReducer'
import {eventInfoReducer} from './eventInfoReducer'
import {otherEventsReducer} from './otherEventsReducer'

const rootReducer = combineReducers({
  userInfo: userInfoReducer,
  featuredEventInfo: eventInfoReducer,
  otherEvents: otherEventsReducer
})

export default rootReducer
