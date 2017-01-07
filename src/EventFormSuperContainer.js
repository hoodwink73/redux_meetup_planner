import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {addEvent} from './actions'

class EventFormContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      eventName: '',
      eventDate: '',
      eventTime: '',
      eventType: '',
      eventHost: '',
      eventCreator: '',
      eventLocation: '',
      eventGuests: '',
      eventDescription: ''
    }
    this.onNameChange = this.onNameChange.bind(this)
    this.onDateChange = this.onDateChange.bind(this)
    this.onTimeChange = this.onTimeChange.bind(this)
    this.onTypeChange = this.onTypeChange.bind(this)
    this.onHostChange = this.onHostChange.bind(this)
    this.onCreatorChange = this.onCreatorChange.bind(this)
    this.onLocationChange = this.onLocationChange.bind(this)
    this.onGuestsChange = this.onGuestsChange.bind(this)
    this.onDescriptionChange = this.onDescriptionChange.bind(this)
    this.onSubmitEvent = this.onSubmitEvent.bind(this)
  }

  onNameChange(synthEvent){
    this.setState({eventName: synthEvent.target.value})
  }
  onDateChange(synthEvent){
    this.setState({eventDate: synthEvent.target.value})
  }
  onTimeChange(synthEvent){
    this.setState({eventTime: synthEvent.target.value})
  }
  onTypeChange(synthEvent){
    this.setState({eventType: synthEvent.target.value})
  }
  onHostChange(synthEvent){
    this.setState({eventHost: synthEvent.target.value})
  }
  onCreatorChange(synthEvent){
    this.setState({eventCreator: synthEvent.target.value})
  }
  onLocationChange(synthEvent){
    this.setState({eventLocation: synthEvent.target.value})
  }
  onGuestsChange(synthEvent){
    this.setState({eventGuests: synthEvent.target.value})
  }
  onDescriptionChange(synthEvent){
    this.setState({eventDescription: synthEvent.target.value})
  }
  onSubmitEvent(synthEvent){
    synthEvent.preventDefault()
    const {dispatch} = this.props
    const {eventName, eventDate, eventTime, eventType, eventHost, eventCreator, eventLocation, eventGuests, eventDescription} = this.state
    dispatch(addEvent( eventName, eventDate, eventTime, eventType, eventHost, eventCreator, eventLocation, eventGuests, eventDescription))
  }

  render(){
    return (
      <div>
        Event Form Container goes here
        <form>
            <label htmlFor="eventName">Event Name: </label> <br/>
            <input type="text" id="eventName" onChange={this.onNameChange}/> <br/>

            <label htmlFor="eventDate">Date: </label> <br/>
            <input type="date" id="eventDate" onChange={this.onDateChange}/> <br/>

            <label htmlFor="eventTime">Time: </label> <br/>
            <input type="time" id="eventTime" onChange={this.onTimeChange}/> <br/>

            <label htmlFor="eventType">Event Type: </label> <br/>
            <input type="text" id="eventType" onChange={this.onTypeChange}/> <br/>

            <label htmlFor="eventHost">Event Host: </label> <br/>
            <input type="text" id="eventHost" onChange={this.onHostChange}/> <br/>

            <label htmlFor="eventCreator">Event Creator: </label> <br/>
            <input type="text" id="eventCreator" onChange={this.onCreatorChange}/> <br/>

            <label htmlFor="eventLocation">Location: </label> <br/>
            <input type="text" id="eventLocation" onChange={this.onLocationChange}/> <br/>

            <label htmlFor="eventGuests">Guests: </label> <br/>
            <input type="text" id="eventGuests" onChange={this.onGuestsChange}/> <br/>

            <label htmlFor="eventDescription">Description: </label> <br/>
            <input type="text" id="eventDescription" onChange={this.onDescriptionChange}/> <br/>

            <button type="submit" onClick={this.onSubmitEvent}>
              <Link to="/viewEvents">Submit Event</Link>
            </button>
        </form>
      </div>
    )
  }
}

EventFormContainer.PropTypes = {
  dispatch: PropTypes.func.isRequired
}

const EventFormSuperContainer = connect()(EventFormContainer)

export default EventFormSuperContainer
