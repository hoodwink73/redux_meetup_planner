import React, {Component, PropTypes} from 'react'
import {Link, browserHistory} from 'react-router'
import {connect} from 'react-redux'
import Geosuggest from 'react-geosuggest'
import myKey from '../utilities/api_key'
import axios from 'axios'
// custom imports
import {addEvent} from '../actions'
// MUI imports
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import {Card, CardHeader, CardTitle} from 'material-ui/Card'
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
    this.onGenericChange = this.onGenericChange.bind(this)
      this.onGenericBlur = this.onGenericBlur.bind(this)
    this.onDateChange = this.onDateChange.bind(this)
      this.onDateBlur = this.onDateBlur.bind(this)
    this.onTimeChange = this.onTimeChange.bind(this)
      this.onTimeBlur = this.onTimeBlur.bind(this)
    this.onSubmitEvent = this.onSubmitEvent.bind(this)
    this.addGuest = this.addGuest.bind(this)
      this.deleteGuest = this.deleteGuest.bind(this)
    this.onSuggestSelect = this.onSuggestSelect.bind(this)
      this.onSuggestNoResults = this.onSuggestNoResults.bind(this)
    this.buttonValidity = this.buttonValidity.bind(this)
  }
  onGenericChange(synthEvent, valueKey){
    this.setState({[valueKey]: synthEvent.target.value})
  }
  onGenericBlur(synthEvent, dirtyKey){
    synthEvent.target.value ?
      this.setState({
        dirty: {...this.state.dirty, [dirtyKey]: true},
        validities: {...this.state.validities, [dirtyKey]: true}
      }) :
      this.setState({
        dirty: {...this.state.dirty, [dirtyKey]: true},
        validities: {...this.state.validities, [dirtyKey]: false}
      })
  }
  onDateChange(synthEvent, date){
    this.setState({eventDate: date})
  }
  onDateBlur(){
      this.setState({
        dirty: {
          ...this.state.dirty,
          date: true
        }
      })
  }
  onTimeChange(synthEvent, time){
    this.setState({eventTime: time})
  }
  onTimeBlur(){
      this.setState({
        dirty: {
          ...this.state.dirtry,
          time: true
        }
      })
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
    this.guestField.focus()
  }
  deleteGuest(guestIndex){
    let guests = this.state.eventGuests
    guests.splice(guestIndex, 1)
    this.setState({eventGuests: guests})
  }
  onSuggestSelect(suggest) {
    axios.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${suggest.placeId}&key=${myKey}`)
          .then( res => {
            const {result} = res.data
            this.setState({ eventLocation: result})
          })
/*
    axios.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${suggest.placeId}&key=${myKey}`)
            .then( res => {
                const {result} = res.data
                this.setState({ eventLocation: result})
                console.log("Place Details Returned: ", result)
                return result.photos
              }
            ).then( photoObj => {
                console.log(photoObj)
                return axios.get(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=4000&photoreference=${photoObj[0].photo_reference}&key=${myKey}`)
            }).then( photo => (
                this.setState({ eventLocation: {
                                  ...this.state.eventLocation, photoUrl: photo // Google HTTP service returns actual image (not url)
                                }
                             })
              )
            )

//OR
    // google is available in the global scope (window) but is not accessible here
    let service = new google.maps.places.PlacesService()//usually pass map instance
    service.getDetails({placeId: suggest.placeId}, (place, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK){
        this.setState({ eventLocation: place})
      }
    })
*/
  }
  onSuggestNoResults(userInput){
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
                onChange={(synthEvent) => this.onGenericChange(synthEvent, "eventName")}
                onBlur={(synthEvent) => this.onGenericBlur(synthEvent, "name")}
                errorText={!this.state.eventName && this.state.dirty.name ?
                            'Please enter an event name' : ''}
              />
{/*Event Date*/}
              <DatePicker
                textFieldStyle={textFieldStyle}
                floatingLabelText="Event date"
                hintText="Event date"
                onChange={this.onDateChange}
                onDismiss={this.onDateBlur}
                autoOk={true}
                value={this.state.eventDate}
                mode="landscape"
                errorText={!this.state.eventDate && this.state.dirty.date ?
                            'Please select a date for your event' : ''}
              />
{/*Event Time*/}
              <TimePicker
                textFieldStyle={textFieldStyle}
                floatingLabelText="Event time"
                hintText="Event time"
                value={this.state.eventDate}
                onChange={this.onTimeChange}
                onDismiss={this.onTimeBlur}
                autoOk={true}
                errorText={!this.state.eventTime && this.state.dirty.time ?
                            'Please select a time for your event' : ''}
              />
{/*Event Type*/}
              <TextField
                style={textFieldStyle}
                floatingLabelText="Event type"
                type="text"
                required="true"
                onChange={(synthEvent) => this.onGenericChange(synthEvent, "eventType")}
                onBlur={(synthEvent) => this.onGenericBlur(synthEvent, "type")}
                errorText={!this.state.eventType && this.state.dirty.type ?
                            'Please enter an event type' : ''}
              />
{/*Event Host*/}
              <TextField
                style={textFieldStyle}
                floatingLabelText="Event host"
                type="text"
                required="true"
                onChange={(synthEvent) => this.onGenericChange(synthEvent, "eventHost")}
                onBlur={(synthEvent) => this.onGenericBlur(synthEvent, "host")}
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
                onChange={(synthEvent) => this.onGenericChange(synthEvent, "eventGuest")}
                ref={ input => this.guestField = input }
              />
              <ContentAddCircleOutline
                    style={ this.state.eventGuest ? {color: 'green'} : {color: 'rgba(0, 0, 0, 0.870588)'}}
                    onClick={this.addGuest}/>
    {/*Display Event Guests*/}
              <div>
                <List style={{width: '80%'}}>
                  {this.state.eventGuests.length !== 0 ? <Subheader>Your Guest List</Subheader> : ''}
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
              style={textFieldStyle}
              floatingLabelText="Event Description"
              type="text"
              multiLine={true}
              rowsMax={10}
              onChange={(synthEvent) => this.onGenericChange(synthEvent, "eventDescription")}
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
