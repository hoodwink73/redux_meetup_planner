import React, {Component, PropTypes} from 'react'
import EventThumbnail from './EventThumbnail'

const sectionStyle = {
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  alignContent: 'flex-start'
}

class OtherEventsSection extends Component {
  constructor(props){
  	super(props)
  	this.state = {}
  }

  render(){
    return(
      <div style={sectionStyle}>
      {
        otherEvents.map( event => (
          <EventThumbnail key={event.eventName}
                          eventName={event.eventName}
                          eventDate={event.eventDate}/>
          )
        )
      }
      </div>
    )
  }
}

const {arrayOf, shape, string, array} = PropTypes
OtherEventsSection.propTypes = {
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

export default OtherEventsSection
