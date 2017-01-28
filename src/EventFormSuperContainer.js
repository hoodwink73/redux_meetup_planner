import React, {Component, PropTypes} from 'react'
import {Link, browserHistory} from 'react-router'
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
      eventLocation: '',
      eventGuest: '',
      eventGuests: [],
      eventDescription: ''
    }
    this.onNameChange = this.onNameChange.bind(this)
    this.onDateChange = this.onDateChange.bind(this)
    this.onTimeChange = this.onTimeChange.bind(this)
    this.onTypeChange = this.onTypeChange.bind(this)
    this.onHostChange = this.onHostChange.bind(this)
    this.onLocationChange = this.onLocationChange.bind(this)
    this.onGuestChange = this.onGuestChange.bind(this)
    this.onDescriptionChange = this.onDescriptionChange.bind(this)
    this.onSubmitEvent = this.onSubmitEvent.bind(this)
    this.addGuest = this.addGuest.bind(this)
    this.deleteGuest = this.deleteGuest.bind(this)
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
  onLocationChange(synthEvent){
    this.setState({eventLocation: synthEvent.target.value})
  }
  onGuestChange(synthEvent){
    this.setState({eventGuest: synthEvent.target.value})
  }
  onDescriptionChange(synthEvent){
    this.setState({eventDescription: synthEvent.target.value})
  }
  onSubmitEvent(synthEvent){
    synthEvent.preventDefault()

    const { dispatch } = this.props
    const { eventName, eventDate, eventTime, eventType, eventHost,
            eventLocation, eventGuests, eventDescription } = this.state

    dispatch(addEvent( eventName, eventDate, eventTime,
                       eventType, eventHost, eventLocation,
                       eventGuests, eventDescription))

    browserHistory.push('/viewEvents')

  }
  addGuest(synthEvent){
    synthEvent.preventDefault()
    const {eventGuest} = this.state
    this.setState({eventGuests: [...this.state.eventGuests, eventGuest]})
    this.guestFieldNode.value = ''
  }
  deleteGuest(guestIndex){
    let guests = this.state.eventGuests
    guests.splice(guestIndex, 1)
    this.setState({eventGuests: guests})
  }
  render(){
    return (
      <div>
        Tell us about your event...
        <form>
            <label htmlFor="eventName">Event Name: </label> <br/>
            <input type="text" id="eventName"
                               onChange={this.onNameChange}
                               /> <br/>

            <label htmlFor="eventDate">Date: </label> <br/>
            <input type="date" id="eventDate"
                               onChange={this.onDateChange}
                               /> <br/>

            <label htmlFor="eventTime">Time: </label> <br/>
            <input type="time" id="eventTime"
                               onChange={this.onTimeChange}
                               /> <br/>

            <label htmlFor="eventType">Event Type: </label> <br/>
            <input type="text" id="eventType"
                               onChange={this.onTypeChange}
                               /> <br/>

            <label htmlFor="eventHost">Event Host: </label> <br/>
            <input type="text" id="eventHost"
                               onChange={this.onHostChange}
                               /> <br/>

            <label htmlFor="eventLocation">Location: </label> <br/>
            <input type="text" id="eventLocation"
                               onChange={this.onLocationChange}
                               /> <br/>

            <label htmlFor="eventGuest">Guests: </label> <br/>
            <input type="text" id="eventGuest"
                               ref={ node => this.guestFieldNode = node}
                               onChange={this.onGuestChange}
                               />
            <button onClick={this.addGuest}>Add Guest</button><br/>

            <div>
                <ul>
                  { this.state.eventGuests.map( (guest, index) =>
                      <li key={guest}>
                        {guest}
                        <span onClick={ () => this.deleteGuest(index) }>
                          &emsp; x
                        </span>
                      </li>
                    )
                  }
                </ul>
            </div>

            <label htmlFor="eventDescription">Description: </label> <br/>
            <input type="text" id="eventDescription"
                               onChange={this.onDescriptionChange}
                               /> <br/>

            <button onClick={this.onSubmitEvent}
                    disabled={false}>
                Submit Event
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
