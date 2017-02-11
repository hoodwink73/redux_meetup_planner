import React, {Component} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'

class DefaultComponent extends Component {
  constructor(props){
      super(props)
  }
  render(){
    return(
      <MuiThemeProvider>
        <div>
        <Card style={{padding: "5%", width: '50%', margin: '70px auto'}}>
        <CardTitle title="Get Started" subtitle="first, let's create a profile" />
         <TextField
            floatingLabelText="Name"
            type="text"
            style={{ width: '80%', margin: 'auto'}}

          /><br />
          <TextField
             floatingLabelText="Email"
             type="email"
             style={{ width: '80%', margin: 'auto'}}
           /><br />
          <TextField
             floatingLabelText="Password"
             type="password"
             style={{ width: '80%', margin: 'auto'}}
           /><br />
           <TextField
              floatingLabelText="Confirm Password"
              type="password"
              style={{ width: '80%', margin: 'auto'}}
            /><br />
            <RaisedButton label="Submit Profile"
                          primary={true}
                          style={{marginTop: '18px'}}
            />
          </Card>
        </div>
      </MuiThemeProvider>


    )
  }
}

export default DefaultComponent

/*
<MuiThemeProvider>
  <div>
   <RaisedButton label="Test Button"
                 primary={true}
   />
   <TextField
      floatingLabelText="Password"
      type="password"
    /><br />
    </div>
</MuiThemeProvider>
*/
