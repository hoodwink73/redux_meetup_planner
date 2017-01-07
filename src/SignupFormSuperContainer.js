import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {addUser} from './actions'
// get state from redux store to appear here

class SignupFormContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      email: '',
      passwordOne: ''
    }

    this.onSubmitUser = this.onSubmitUser.bind(this)
    this.onNameChange = this.onNameChange.bind(this)
    this.onEmailChange = this.onEmailChange.bind(this)
    this.onPasswordOneChange = this.onPasswordOneChange.bind(this)
  }
  onSubmitUser(synthEvent){
    synthEvent.preventDefault()
    const {dispatch} = this.props
    const {username, email, passwordOne} = this.state
    dispatch(addUser(username, email, passwordOne))
  }
  onNameChange(synthEvent){
    this.setState({username: synthEvent.target.value})
  }
  onEmailChange(synthEvent){
    this.setState({email: synthEvent.target.value})
  }
  onPasswordOneChange(synthEvent){
    this.setState({passwordOne: synthEvent.target.value})
  }
  render(){
    const { dispatch } = this.props
    return (
      <div>
        Signup Form Container goes here <br/><br/>
        <form>
          <label htmlFor="name">Name: </label> <br/>
          <input type="text" id="name" onChange={this.onNameChange}/> <br/>

          <label htmlFor="email">Email Address: </label><br/>
          <input type="email" id="email" onChange={this.onEmailChange}/><br/>

          <label htmlFor="passwordOne">Create Password:</label><br/>
          <input type="password" id="passwordOne" onChange={this.onPasswordOneChange}/><br/>

          <button type="submit" onClick={this.onSubmitUser}>
            <Link to="/eventForm">Test for Submit within form</Link>
          </button>
        </form>
      </div>

    )
  }
}

SignupFormContainer.PropTypes = {
  dispatch: PropTypes.func.isRequired
}

const SignupFormSuperContainer = connect()(SignupFormContainer)

export default SignupFormSuperContainer

/*
SignupFormContainer.PropTypes = {
  username: PropTypes.string.isRequired
}

const mapStateToSignUpProps = (state) => {
  return {
    username: state.username
  }
}

const SignupFormSuperContainer = connect(mapStateToSignUpProps)(SignupFormContainer)
const SignupFormSuperContainer = connect()(SignupFormContainer)
*/
