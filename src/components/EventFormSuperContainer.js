import React, {Component, PropTypes} from 'react'
import {Link, browserHistory} from 'react-router'
import {connect} from 'react-redux'
import Geosuggest from 'react-geosuggest'
// custom imports
import {addEvent} from '../actions'
// MUI imports
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import {List, ListItem} from 'material-ui/List'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import DatePicker from 'material-ui/DatePicker'
import TimePicker from 'material-ui/TimePicker'
import ContentAddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline'
import ContentRemoveCircleOutline from 'material-ui/svg-icons/content/remove-circle-outline'

class EventFormContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      eventName: '',
      eventDate: null,
      eventTime: null,
      eventType: '',
      eventHost: '',
      eventLocation: {},
      eventGuest: '',
      eventGuests: [],
      eventDescription: '',
      validities: {
        name: false, type: false, host: false
      },
      dirty: {name: false, date: false, time: false, type: false, host: false, location: false, guest: false, description: false}
    }

    this.onNameChange = this.onNameChange.bind(this)
      this.onNameBlur = this.onNameBlur.bind(this)
    this.onDateChange = this.onDateChange.bind(this)
    this.onTimeChange = this.onTimeChange.bind(this)
    this.onTypeChange = this.onTypeChange.bind(this)
      this.onTypeBlur = this.onTypeBlur.bind(this)
    this.onHostChange = this.onHostChange.bind(this)
      this.onHostBlur = this.onHostBlur.bind(this)
    this.onGuestChange = this.onGuestChange.bind(this)
    this.onDescriptionChange = this.onDescriptionChange.bind(this)
    this.onSubmitEvent = this.onSubmitEvent.bind(this)
    this.addGuest = this.addGuest.bind(this)
      this.deleteGuest = this.deleteGuest.bind(this)
    this.onSuggestSelect = this.onSuggestSelect.bind(this)
      this.onSuggestNoResults = this.onSuggestNoResults.bind(this)
    this.buttonValidity = this.buttonValidity.bind(this)
  }

  onNameChange(synthEvent){
    this.setState({eventName: synthEvent.target.value})
  } onNameBlur(synthEvent){
      synthEvent.target.value ?
        this.setState({dirty: {...this.state.dirty, name: true},
                       validities: {...this.state.validities, name: true}}) :
        this.setState({dirty: {...this.state.dirty, name: true},
                      validities: {...this.state.validities, name: false}})
  }

  onDateChange(synthEvent, date){
    this.setState({eventDate: date})
  }

  onTimeChange(synthEvent, time){
    this.setState({eventTime: time})
  }

  onTypeChange(synthEvent){
    this.setState({eventType: synthEvent.target.value})
  } onTypeBlur(synthEvent){
      synthEvent.target.value ?
        this.setState({dirty: {...this.state.dirty, type: true},
                       validities: {...this.state.validities, type: true}}) :
        this.setState({dirty: {...this.state.dirty, type: true},
                      validities: {...this.state.validities, type: false}})
  }

  onHostChange(synthEvent){
    this.setState({eventHost: synthEvent.target.value})
  } onHostBlur(synthEvent){
      synthEvent.target.value ?
        this.setState({dirty: {...this.state.dirty, host: true},
                       validities: {...this.state.validities, host: true}}) :
        this.setState({dirty: {...this.state.dirty, host: true},
                      validities: {...this.state.validities, host: false}})
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
    this.setState({ eventGuest: '' ,
                    eventGuests: [...this.state.eventGuests, eventGuest]
                  })
  } deleteGuest(guestIndex){
    let guests = this.state.eventGuests
    guests.splice(guestIndex, 1)
    this.setState({eventGuests: guests})
  }

  onSuggestSelect(suggest) {
    this.setState({eventLocation: suggest})
  }  onSuggestNoResults(userInput){
    console.log("onSuggestNoResults for: ", userInput)
  }
  buttonValidity(validities){
    let overallValidity = true
    for(var validity in validities){
      if(validities[validity] == false){
        overallValidity = false
      }
    }
    return !overallValidity
  }

  render(){
    const textFieldStyle = { width: '80%', margin: 'auto'}
    const buttonStyle = { marginTop: '20px'}

    return (
      <div>
        <MuiThemeProvider>
          <div>
            <Card style={{padding: "5%", width: '50%', margin: '70px auto'}}>
              <CardTitle title="Create your event"/>
{/*Event Name*/}
              <TextField
                style={textFieldStyle}
                floatingLabelText="Event name"
                type="text"
                required="true"
                onChange={this.onNameChange}
                onBlur={this.onNameBlur}
                errorText={!this.state.eventName && this.state.dirty.name ?
                            'Please enter an event name' : ''}
              />
{/*Event Date*/}
              <DatePicker
                hintText="Event date"
                onChange={this.onDateChange}
                value={this.state.eventDate}
                mode="landscape"
                textFieldStyle={textFieldStyle}
              />
{/*Event Time*/}
              <TimePicker
                hintText="Event time"
                value={this.state.eventDate}
                onChange={this.onTimeChange}
                textFieldStyle={textFieldStyle}
              />
{/*Event Type*/}
              <TextField
                style={textFieldStyle}
                floatingLabelText="Event type"
                type="text"
                required="true"
                onChange={this.onTypeChange}
                onBlur={this.onTypeBlur}
                errorText={!this.state.eventType && this.state.dirty.type ?
                            'Please enter an event type' : ''}
              />
{/*Event Host*/}
              <TextField
                style={textFieldStyle}
                floatingLabelText="Event host"
                type="text"
                required="true"
                onChange={this.onHostChange}
                onBlur={this.onHostBlur}
                errorText={!this.state.eventHost && this.state.dirty.host ?
                            'Please enter an event host' : ''}
              />
{/*Event Location via <GeoSuggest/>*/}
              <div>
                <Geosuggest
                    placeholder="what is the location of your event?"
                    label="Event Location:"
                    id="eventLocation"
                    onSuggestSelect={this.onSuggestSelect}
                    onSuggestNoResults={this.onSuggestNoResults}
                    onChange={this.onGeosuggestChange}
                    />
              </div>
{/*Event Guests*/}
  {/*Add Event Guest*/}
              <TextField
                style={textFieldStyle}
                floatingLabelText="Add a Guest"
                type="text"
                value={this.state.eventGuest}
                onChange={this.onGuestChange}
              />
              <ContentAddCircleOutline
                    style={ this.state.eventGuest ? {color: 'green'} : {color: 'rgba(0, 0, 0, 0.870588)'}}
                    onClick={this.addGuest}/>
    {/*Display Event Guests*/}
              <div>
                <List style={{width: '80%'}}>
                  {
                    this.state.eventGuests.map( (guest, index) =>
                        <ListItem key={guest}
                                  primaryText={guest}
                                  rightIcon={
                                    <ContentRemoveCircleOutline
                                        style={{ marginLeft: '20px', marginBottom: '-3px',
                                                 color: 'red', width: '16px', height: '16px'}}
                                        onClick={ () => this.deleteGuest(index) }/>
                                  }
                          />
                      )
                    }
                </List>
            </div>
{/*Event Description*/}
            <TextField
              floatingLabelText="Event Description"
              multiLine={true}
              rows={3}
              rowsMax={10}
              onChange={this.onDescriptionChange}
            /><br/>
{/*Submit Event Button*/}
            <RaisedButton onClick={this.onSubmitEvent}
                          disabled={this.buttonValidity(this.state.validities)}
                          label="Create Event"
                          style={buttonStyle}
            />
            </Card>
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}

const {func} = PropTypes
EventFormContainer.propTypes = {
  dispatch: func.isRequired
}

const EventFormSuperContainer = connect()(EventFormContainer)

export default EventFormSuperContainer
