import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
// custom imports
import {fetchOtherEvents} from '../actions'
import FeaturedEventCard from './FeaturedEventCard'
import OtherEventsSection from './OtherEventsSection'
// MUI imports
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class ViewEventsContainer extends Component {
  constructor(props){
    super(props)
    const {dispatch} = props
    //axios.get('https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4&key=YOUR_API_KEY')
    dispatch(fetchOtherEvents())

  }
  render(){
    const {
      eventName,
      eventDate,
      eventTime,
      eventType,
      eventHost,
      eventCreator,
      eventLocation,// {label, placeId, location, gmaps}
      eventGuests,
      eventDescription,
      otherEvents
    } = this.props

    return (
      <div>
        <MuiThemeProvider>
          <div style={{width: '50%'}}>
            <FeaturedEventCard eventName={eventName}
                               eventDate={eventDate}
                               eventTime={eventTime}
                               eventType={eventType}
                               eventHost={eventHost}
                               eventCreator={eventCreator}
                               eventLocation={eventLocation}
                               eventGuests={eventGuests}
                               eventDescription={eventDescription} />
           <OtherEventsSection otherEvents={otherEvents}/>
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}

const {func, string, object, array, arrayOf, shape} = PropTypes
ViewEventsContainer.propTypes = {
  dispatch: func.isRequired,
  eventName: string,
  eventDate: object, // date object
  eventTime: object, // date object
  eventType: string,
  eventHost: string,
  eventCreator: string,
  eventLocation: object, // {label, placeId, location, gmaps}
  eventGuests: array,
  eventDescription: string,
  otherEvents: arrayOf(
    shape({
      eventName: string,
      eventDate: string,
      eventType: string,
      eventHost: string,
      eventCreator: string,
      eventLocation: string,
      eventGuests: arrayOf(string),
      eventDescription: string
    })
  )
}

const mapStateToViewEventsContainerProps = (state) => {
  const {userInfo, featuredEventInfo, otherEvents} = state
  return {
      eventName: featuredEventInfo.eventName,
      eventDate: featuredEventInfo.eventDate,
      eventTime: featuredEventInfo.eventTime,
      eventType: featuredEventInfo.eventType,
      eventHost: featuredEventInfo.eventHost,
      eventCreator: userInfo.username,
      eventLocation: featuredEventInfo.eventLocation,
      eventGuests: featuredEventInfo.eventGuests,
      eventDescription: featuredEventInfo.eventDescription,
      otherEvents: otherEvents.otherEvents,
      isFetchingEvents: otherEvents.isFetching
    }
  }

const ViewEventsSuperContainer = connect(mapStateToViewEventsContainerProps)(ViewEventsContainer)
export default ViewEventsSuperContainer
