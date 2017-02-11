import React, {Component} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'

const AppShell = (props) => (
  <div>
    <MuiThemeProvider>
      <AppBar
        title="Meetup Planner"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
      />
    </MuiThemeProvider>
    <div>
      {props.children}
    </div>
  </div>
)

export default AppShell
