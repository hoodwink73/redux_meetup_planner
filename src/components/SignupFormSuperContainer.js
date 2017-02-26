import React, {Component, PropTypes} from 'react'
import {Link, browserHistory} from 'react-router'
import {connect} from 'react-redux'
// custom imports
import {addUser} from '../actions'
import patterns from '../utilities/regExPatterns'
import PasswordOneCriteria from './PasswordOneCriteria'
import PasswordTwoCriteria from './PasswordTwoCriteria'
// MUI imports
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Divider from 'material-ui/Divider'
import {Card, CardHeader, CardTitle} from 'material-ui/Card'


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
      passwordTwoDirty: false,
      nameDirty: false,
      emailDirty: false
    }

    this.onSubmitUser = this.onSubmitUser.bind(this)
    this.onNameChange = this.onNameChange.bind(this)
      this.onNameBlur = this.onNameBlur.bind(this)
    this.onEmailChange = this.onEmailChange.bind(this)
      this.onEmailBlur = this.onEmailBlur.bind(this)
    this.onPasswordOneChange = this.onPasswordOneChange.bind(this)
      this.onPasswordOneFocus = this.onPasswordOneFocus.bind(this)
    this.onPasswordTwoChange = this.onPasswordTwoChange.bind(this)
      this.onPasswordTwoFocus = this.onPasswordTwoFocus.bind(this)
    this.buttonValidity = this.buttonValidity.bind(this)
  }

  onSubmitUser(synthEvent){
    synthEvent.preventDefault()

    const {dispatch} = this.props
    const {username, email, passwordOne} = this.state

    dispatch(addUser(username, email, passwordOne))
    browserHistory.push('/eventForm')
  }

  onNameChange(synthEvent){
    this.setState({username: synthEvent.target.value})
  } onNameBlur(synthEvent){
      synthEvent.target.checkValidity() ?
        this.setState({ validities: {...this.state.validities, name: true},
                        nameDirty: true
                      }) :
        this.setState({ validities: {...this.state.validities, name: false},
                        nameDirty: true
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
  } onEmailBlur(){
      this.setState({emailDirty: true})
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
    // the following block of code behaves irregularly if handle password validities within the component state
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
  } onPasswordOneFocus(){
      this.setState({passwordOneDirty: true})
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
  } onPasswordTwoFocus(){
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
    const textFieldStyle = { width: '80%', margin: 'auto'}
    const buttonStyle = { marginTop: '20px'}
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <Card style={{padding: "5%", width: '50%', margin: '70px auto'}}>
          <CardTitle title="Get Started" subtitle="first, let's create a profile" />
{/*User name*/}
            <TextField
              style={textFieldStyle}
              floatingLabelText="Name"
              type="text"
              required="true"
              onChange={this.onNameChange}
              onBlur={this.onNameBlur}
              value={this.state.username}
              errorText={ !this.state.validities.name && this.state.nameDirty ?
                          'Please enter your name' : '' }
            /><br/>
{/*User email*/}
            <TextField
              style={textFieldStyle}
              floatingLabelText="E-mail Address"
              type="email"
              required="true"
              onChange={this.onEmailChange}
              onBlur={this.onEmailBlur}
              value={this.state.email}
              errorText= { !this.state.validities.email && this.state.emailDirty ?
                           'Please enter a valid e-mail address' : ''}
            /><br/>
{/*User password 1 of 2*/}
            <TextField
              style={textFieldStyle}
              floatingLabelText="Create password"
              type="password"
              onChange={this.onPasswordOneChange}
              value={this.state.passwordOne}
              onFocus={this.onPasswordOneFocus}
            /><br/>
    {/*Dynamic Password Hinting*/}
            <PasswordOneCriteria dirty={this.state.passwordOneDirty}
                                 lower={this.state.validities.passwordOneLower}
                                 upper={this.state.validities.passwordOneUpper}
                                 number={this.state.validities.passwordOneNumber}
                                 specialChar={this.state.validities.passwordOneSpecialChar}
                                 length={this.state.validities.passwordOneLength}
                                 />
{/*User password 2 of 2*/}
            <TextField
              style={textFieldStyle}
              floatingLabelText="Confirm password"
              type="password"
              onChange={this.onPasswordTwoChange}
              onFocus={this.onPasswordTwoFocus}
              value={this.state.passwordTwo}
            /><br/>
    {/*Password confirmation matching feedback*/}
            <PasswordTwoCriteria dirty={this.state.passwordTwoDirty}
                                 match={this.state.validities.passwordTwoMatch}
                                 />
{/*Submit Signup Form button*/}
            <RaisedButton onClick={this.onSubmitUser}
                          disabled={this.buttonValidity(this.state.validities)}
                          label="Sign-Up"
                          style={buttonStyle}
            />
          </Card>
        </div>
      </MuiThemeProvider>
  </div>
    )
  }
}

const {func} = PropTypes
SignupFormContainer.propTypes = {
  dispatch: func.isRequired
}

const SignupFormSuperContainer = connect()(SignupFormContainer)
export default SignupFormSuperContainer
