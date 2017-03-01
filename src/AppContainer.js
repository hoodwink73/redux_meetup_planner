import React, {Component} from 'react'
import {Router, Route, IndexRoute, browserHistory } from 'react-router'
import AppShell from './components/AppShell'
import SignupFormSuperContainer from './components/SignupFormSuperContainer'
import EventFormSuperContainer from './components/EventFormSuperContainer'
import ViewEventsSuperContainer from './components/ViewEventsSuperContainer'
import './App.css'

export default class AppContainer extends Component {
  render(){
    return (
      <Router history={browserHistory}>
        <Route path="/" component={AppShell}>
          <IndexRoute component={SignupFormSuperContainer}/>
          <Route path="eventForm" component={EventFormSuperContainer}/>
          <Route path="viewEvents" component={ViewEventsSuperContainer}/>
        </Route>
      </Router>
    )
  }
}
