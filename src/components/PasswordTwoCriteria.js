import React, {Component, PropTypes} from 'react'
// MUI imports
import {List, ListItem} from 'material-ui/List'
import ActionCheckCircle from 'material-ui/svg-icons/action/check-circle'
import ActionHighlightOff from 'material-ui/svg-icons/action/highlight-off'
import {green500, red500} from 'material-ui/styles/colors'

const PasswordTwoCriteria = ({ dirty, match }) => (
  <div id="passwordTwoCriteria" style={ dirty ? {display: 'block'} : {display: 'none'}}>
    <List>
      <ListItem primaryText="Passwords must match"
                style={ match ? {color: 'green'} : {color: 'red'} }
                leftIcon={ match ? <ActionCheckCircle color={green500}/> :
                                   <ActionHighlightOff color={red500}/>
                         }
      />
    </List>
  </div>
)

const {bool} = PropTypes
PasswordTwoCriteria.propTypes = {
  dirty: bool,
  match: bool
}
export default PasswordTwoCriteria
