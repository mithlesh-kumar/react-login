import React, { Component } from 'react'
//import PropTypes from 'prop-types'

import styles from './styles.css'

const pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i)

function isValidEmail(email) {
  return !pattern.test(email)
}
class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fields: {},
      errors: {}
    }
  }

  submitHandle = event => {
    event.preventDefault()
    if (this.validateForm()) {
      let fields = {}
      fields['email'] = ''
      fields['password'] = ''

      const { onSubmit, getSubmit } = this.props

      onSubmit(this.state.fields)
      getSubmit(this.state.fields)

      this.setState({ fields: fields })
    }
  }

  handleChange = event => {
    let fields = this.state.fields
    fields[event.target.name] = event.target.value
    this.setState({
      fields
    })
  }
  validateForm() {
    const { errorMessages } = this.props
    let fields = this.state.fields
    let errors = {}
    let formIsValid = true

    if (!fields['email']) {
      formIsValid = false
      // errors["email"] = "*emailId is required.";
      errors['email'] = errorMessages.username
    }
    if (typeof fields['email'] !== 'undefined') {
      if (!isValidEmail(fields['email'])) {
        formIsValid = false
        // errors["email"] = "*Please enter valid email-ID.";
        errors['email'] = errorMessages.validUsername
      }
    }

    if (!fields['password']) {
      formIsValid = false
      // errors["password"] = "*password is required.";
      errors['password'] = errorMessages.password
    }

    if (typeof fields['password'] !== 'undefined') {
      if (!fields['password'].match(/^.*(?=.{6,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
        formIsValid = false
        // errors["password"] = "*Please enter strong password of minimum 6 digit.";
        errors['password'] = errorMessages.validPassword
      }
    }

    // return errors
    this.setState({
      errors: errors
    })

    console.log(formIsValid, errors)

    if (formIsValid) {
      console.log('email :' + fields['email'])
      //console.log ("password :" + fields["password"]);
    }

    return formIsValid
  }

  render() {

    const klass = `${styles.login} ${this.props.customClass}`

    return (

      <div className={klass}>
        <div id='login'  >
          customMessage :{this.props.text}
          <h1>Login page</h1>

          <form method='post' name='userLoginForm' onSubmit={this.submitHandle} >

            <label>emailId*:</label>
            <input type='text' name='email' value={this.state.fields.email} onChange={this.handleChange} placeholder='enter userName' />
            <div className='errorMsg' >{this.state.errors.email}</div>

            <br /> <br />
            <label>password*:</label>
            <input type='password' name='password' value={this.state.fields.password} onChange={this.handleChange} placeholder='enter password' />
            <div className = 'errorMsg'>{this.state.errors.password}</div>

            <br />
            <label></label>
            <input type='submit' className='button' value='login' />

          </form>
        </div>
      </div>
    )
  }
}
export default Login
