import React, {Component} from 'react'

const PasswordOneCriteria = ({ dirty, lower, upper,
                               number, specialChar, length}) => (

 <div id="passwordOneCriteria" style={ dirty ? {display: 'block'} : {display: 'none'}}>
   <h5> Password Must Contain:</h5>
   <ul>
     <li style={ lower ? {color: 'green'} : {color: 'red'}}>
         At least 1 lowercase letter
     </li>
     <li style={ upper ? {color: 'green'} : {color: 'red'}}>
         At least 1 uppercase letter
     </li>
     <li style={ number ? {color: 'green'} : {color: 'red'}}>
         At least 1 number
     </li>
     <li style={ specialChar ? {color: 'green'} : {color: 'red'}}>
         At least 1 special character
     </li>
     <li style={ length ? {color: 'green'} : {color: 'red'}}>
         At least 8 characters
     </li>
   </ul>
 </div>
)

export default PasswordOneCriteria
