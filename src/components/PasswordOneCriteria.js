import React, {Component, PropTypes} from 'react'
// MUI imports
import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import ActionCheckCircle from 'material-ui/svg-icons/action/check-circle'
import ActionHighlightOff from 'material-ui/svg-icons/action/highlight-off'
import {green500, red500} from 'material-ui/styles/colors'

const criteria = [
  {name: 'lower', text: 'At least 1 lowercase letter'},
  {name: 'upper', text: 'At least 1 uppercase letter'},
  {name: 'number', text: 'At least 1 number'},
  {name: 'specialChar', text: 'At least 1 special character'},
  {name: 'length', text: 'At least 8 characters'},
]

const PasswordOneCriteria = ({ dirty, lower, upper,
                               number, specialChar, length}) => (
   <div style={ dirty ? {display: 'block'} : {display: 'none'}}>
     <List>
       <Subheader>Password Must Contain the Following:</Subheader>
       {
         criteria.map( (criterion, index) =>
             <ListItem
               key={index}
               primaryText={criterion.text}
               style={ eval(criterion.name) ? {color: 'green'} : {color: 'red'}}
               leftIcon={ eval(criterion.name) ?
                           <ActionCheckCircle color={green500}/> :
                           <ActionHighlightOff color={red500}/>
                        }
             />
         )
       }
     </List>
   </div>
)

const {bool} = PropTypes
PasswordOneCriteria.propTypes = {
  dirty: bool,
  lower: bool,
  upper: bool,
  number: bool,
  specialChar: bool,
  length: bool
}
export default PasswordOneCriteria
