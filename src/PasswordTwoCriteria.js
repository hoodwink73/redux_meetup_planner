import React, {Component} from 'react'

const PasswordTwoCriteria = ({ dirty, match }) => (

   <div id="passwordTwoCriteria" style={ dirty ? {display: 'block'} : {display: 'none'}}>
       <h5 style={match ? {color: 'green'} : {color: 'red'} }>
           Password must match
       </h5>
    </div>
)

export default PasswordTwoCriteria
