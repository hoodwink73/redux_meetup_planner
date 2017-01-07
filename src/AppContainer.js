import React, {Component} from 'react'
import {Router, Route, browserHistory } from 'react-router'
import SignupFormSuperContainer from './SignupFormSuperContainer'
import EventFormSuperContainer from './EventFormSuperContainer'
import ViewEventsSuperContainer from './ViewEventsSuperContainer'


export default class AppContainer extends Component {
  render(){
    return (
      <Router history={browserHistory}>
        <Route path="/" component={SignupFormSuperContainer}/>
        <Route path="eventForm" component={EventFormSuperContainer}/>
        <Route path="viewEvents" component={ViewEventsSuperContainer}/>
      </Router>
    )
  }
}
