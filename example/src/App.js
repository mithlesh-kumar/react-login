import React, { Component } from 'react'

import Login from 'react-login';
export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      fields: {},
      errors: {},

    };
  }

  submitHandle = (e) =>{
    e.preventDefault()
    console.log(this.state.fields)
  }

  render() {
    return (
      <div>
        <Login
          text = 'hello react'
          errorMessages={{
            username: '*username error ',
            validUsername: '*enter your valid username/emailid',
            password: '*password error',
            validPassword : '*password should be min 6 digit and strong'
          }}
          onSubmit={this.submitHandler}
          customClass="custom-class"
        />
      </div>
    )
  }
}
