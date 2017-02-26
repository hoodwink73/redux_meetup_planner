import React, {Component, PropTypes} from 'react'
// custom imports
import formatDateAndTime from '../utilities/formatDateAndTime'
import guestItems from '../utilities/guestItems'
// MUI imports
import Divider from 'material-ui/Divider'
import {Card, CardHeader} from 'material-ui/Card'
import {List, ListItem} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import NotificationEventNote from 'material-ui/svg-icons/notification/event-note'
import SocialPeople from 'material-ui/svg-icons/social/people'
import ActionEvent from 'material-ui/svg-icons/action/event'
import MapsPlace from 'material-ui/svg-icons/maps/place'

class FeaturedEventCard extends Component{
  constructor(props){
  	super(props)
  	this.state = {
      descriptionIsOpen: true,
      guestListIsOpen: false,
      locationIsOpen: true
    }
    this.toggleDescription = this.toggleDescription.bind(this)
    this.toggleGuestList = this.toggleGuestList.bind(this)
    this.toggleLocation = this.toggleLocation.bind(this)
  }
  toggleDescription(){
    this.setState({descriptionIsOpen: !this.state.descriptionIsOpen})
  }
  toggleGuestList(){
    this.setState({guestListIsOpen: !this.state.guestListIsOpen})
  }
  toggleLocation(){
    this.state({locationIsOpen: !this.state.locationIsOpen})
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
            eventDescription
          } = this.props
    return(
      <Card style={{padding: "5%", width: '100%', margin: '70px auto'}}>
{/*Header*/}
         <CardHeader
              title={eventName}
              subtitle={eventType}
         />
        <Divider />
        <List>
{/*Featured Event Date and Time*/}
          <ListItem primaryText={formatDateAndTime(eventDate, eventTime)}
                    leftIcon={<ActionEvent />}
                    nestedItems={[
                      <ListItem key="1" primaryText={`Event hosted by ${eventHost} (created by ${eventCreator})`}/>
                    ]}/>
{/*Featured Event Location*/}
          <ListItem primaryText='Location'
                    open={this.state.locationIsOpen}
                    onNestedListToggle={this.toggleLocation}
                    leftIcon={<MapsPlace/>}
                    nestedItems={[
                      <ListItem key={eventLocation.label}
                                primaryText={eventLocation.label}/>,
                      <ListItem key={eventLocation.gmaps.formatted_address}
                                primaryText={eventLocation.gmaps.formatted_address}/>
                    ]}/>
{/*Featured Event Description*/}
          <ListItem primaryText='Event Description'
                    open={this.state.descriptionIsOpen}
                    onNestedListToggle={this.toggleDescription}
                    leftIcon={<NotificationEventNote />}
                    nestedItems={[<ListItem key="1" primaryText={eventDescription}/>]}/>
{/*Featured Event Guest List*/}
          <ListItem primaryText='Guests'
                    open={this.state.guestListIsOpen}
                    onNestedListToggle={this.toggleGuestList}
                    leftIcon={<SocialPeople />}
                    nestedItems={guestItems(eventGuests)}/>
        </List>
      </Card>
    )
  }
}

const {func, string, object, array} = PropTypes
FeaturedEventCard.propTypes = {
  eventName: string,
  eventDate: object, // date object
  eventTime: object, // date object
  eventType: string,
  eventHost: string,
  eventCreator: string,
  eventLocation: object, // {label, placeId, location, gmaps}
  eventGuests: array,
  eventDescription: string
}

export default FeaturedEventCard
