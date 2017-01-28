import React, {Component, PropTypes} from 'react'
import {Link, browserHistory} from 'react-router'
import {connect} from 'react-redux'
import {addUser} from './actions'
import patterns from './regExPatterns'
import PasswordOneCriteria from './PasswordOneCriteria'
import PasswordTwoCriteria from './PasswordTwoCriteria'

class SignupFormContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      email: '',
      passwordOne: '',
      passwordTwo:'',
      validities: {
        name: false,
        email: false,
        passwordOneLower: false,
        passwordOneUpper: false,
        passwordOneNumber: false,
        passwordOneSpecialChar: false,
        passwordOneLength: false,
        passwordTwoMatch: false
      },
      passwordOneDirty: false,
      passwordTwoDirty: false
    }

    this.onSubmitUser = this.onSubmitUser.bind(this)
    this.onNameChange = this.onNameChange.bind(this)
    this.onEmailChange = this.onEmailChange.bind(this)
    this.onPasswordOneChange = this.onPasswordOneChange.bind(this)
    this.onPasswordTwoChange = this.onPasswordTwoChange.bind(this)
    this.onPasswordOneFocus = this.onPasswordOneFocus.bind(this)
    this.onPasswordTwoFocus = this.onPasswordTwoFocus.bind(this)
    this.buttonValidity - this.buttonValidity.bind(this)
  }

  onSubmitUser(synthEvent){
    synthEvent.preventDefault()

    const {dispatch} = this.props
    const {username, email, passwordOne} = this.state

    dispatch(addUser(username, email, passwordOne))
    browserHistory.push('/eventForm')
  }

  onNameChange(synthEvent){
    synthEvent.target.checkValidity() ?
      this.setState({ username: synthEvent.target.value,
                      validities: {...this.state.validities, name: true}
                    }) :
      this.setState({ username: synthEvent.target.value,
                      validities: {...this.state.validities, name: false}
                    })
  }

  onEmailChange(synthEvent){
    synthEvent.target.checkValidity() ?
      this.setState({ email: synthEvent.target.value,
                      validities: {...this.state.validities, email: true}
                    }) :
      this.setState({ email: synthEvent.target.value,
                      validities: {...this.state.validities, email: false}
                    })
  }

  onPasswordOneChange(synthEvent){
    let password = synthEvent.target.value
    let passwordValidities = {
      passwordOneLower: false,
      passwordOneUpper: false,
      passwordOneNumber: false,
      passwordOneSpecialChar: false,
      passwordOneLength: false
    }
    // this block of code behaves irregularly if handle password validities within the component state
    // as opposed to sotring in a local, intermediate object

    patterns.lowercase.test(password) ? passwordValidities.passwordOneLower = true :
            passwordValidities.passwordOneLower = false
    patterns.uppercase.test(password) ? passwordValidities.passwordOneUpper = true :
            passwordValidities.passwordOneUpper = false
    patterns.number.test(password) ? passwordValidities.passwordOneNumber = true :
            passwordValidities.passwordOneNumber = false
    patterns.specialChar.test(password) ? passwordValidities.passwordOneSpecialChar = true :
            passwordValidities.passwordOneSpecialChar = false
    password.length >= 8 ? passwordValidities.passwordOneLength = true :
            passwordValidities.passwordOneLength = false

    this.setState({ passwordOne: password,
                    validities: {...this.state.validities, ...passwordValidities}
                  })
  }

  onPasswordTwoChange(synthEvent){
    let password = synthEvent.target.value
        password == this.state.passwordOne ?
              this.setState({ passwordTwo: password,
                              validities: {...this.state.validities, passwordTwoMatch: true}
                            }) :
              this.setState({ passwordTwo: password,
                              validities: {...this.state.validities, passwordTwoMatch: false}
                            })
  }

  onPasswordOneFocus(){
    this.setState({passwordOneDirty: true})
  }

  onPasswordTwoFocus(){
    this.setState({passwordTwoDirty: true})
  }

  buttonValidity( validities ){
    let overallValidity = true
    for(var criteria in validities){
      if( validities[criteria] == false){
        overallValidity = false
      }
    }
    return !overallValidity

  }

  render(){
    const { dispatch } = this.props
    return (
      <div>
        Signup <br/><br/>
        <form>
          <label htmlFor="name">Name: </label> <br/>
          <input type="text" id="name"
                             required="true"
                             onChange={this.onNameChange}/> <br/>

          <label htmlFor="email">Email Address: </label><br/>
          <input type="email" id="email"
                              required="true"
                              onChange={this.onEmailChange}/><br/>

          <label htmlFor="passwordOne">Create Password:</label><br/>
          <input type="password" id="passwordOne"
                                 onChange={this.onPasswordOneChange}
                                 onFocus={this.onPasswordOneFocus}
                                 /><br/>

          <PasswordOneCriteria dirty={this.state.passwordOneDirty}
                               lower={this.state.validities.passwordOneLower}
                               upper={this.state.validities.passwordOneUpper}
                               number={this.state.validities.passwordOneNumber}
                               specialChar={this.state.validities.passwordOneSpecialChar}
                               length={this.state.validities.passwordOneLength}
                               />

         <label htmlFor="passwordTwo">Confirm Password:</label><br/>
         <input type="password" id="passwordTwo"
                               onChange={this.onPasswordTwoChange}
                               onFocus={this.onPasswordTwoFocus}
                               /><br/>

         <PasswordTwoCriteria dirty={this.state.passwordTwoDirty}
                              match={this.state.validities.passwordTwoMatch}
                              />

        <button onClick={this.onSubmitUser}
                disabled={this.buttonValidity(this.state.validities)}>
           Sign-Up
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

<Link to="/eventForm">
  <button disabled={  this.buttonValidity(this.state.validities) }
          onClick={this.onSubmitUser}
          >
  Sign Up
</button>
</Link>
*/
