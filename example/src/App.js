import React, { Component } from 'react'
//import ExampleComponent from 'react-login'

import Login from 'react-login';
export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      fields: {},
      errors: {},

    };
  }
  submitHandle = event => {
    event.preventDefault();
    if (this.validateForm()) {
      let fields = {};
      fields["email"] = "";
      fields["password"] = "";
      this.setState({ fields: fields });
        console.log(this.state.fields)
      // this.state.fields
       }
    }

     handleChange = event => {
    let fields = this.state.fields;
    fields[event.target.name] = event.target.value;
    this.setState({
      fields
    });
    //console.log(this.state.fields)
  }

  validateForm() {

    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["email"]) {
      formIsValid = false;
       errors["email"] = "*emailId is required.";
      //errors["email"] = this.props.errorMessages.username;
    }
    if (typeof fields["email"] !== "undefined") {
      //regular expression for email validation
      let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(fields["email"])) {
        formIsValid = false;
         errors["email"] = "*Please enter valid email-ID.";
        // errors["email"] = this.props.errorMessages.validUsername;
      }
    }


    if (!fields["password"]) {
      formIsValid = false;
       errors["password"] = "*password is required.";
     // errors["password"] = this.props.errorMessages.password;
    }

    if (typeof fields["password"] !== "undefined") {
      if (!fields["password"].match(/^.*(?=.{6,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
        formIsValid = false;
        errors["password"] = "*Please enter strong password of minimum 6 digit.";
       //  errors["password"] = this.props.errorMessages.validPassword;
      }
    }

    // return errors
    this.setState({
      errors: errors
    });

    console.log(formIsValid, errors);

        //  if(formIsValid===true){
        // console.log("email :" + fields["email"]);
        //console.log ("password :" + fields["password"]);
    // }

    return formIsValid;
  }

  submitHandler = (e) => {
    console.log('qwerty' , e)

}
// submitHandle = (e) =>{
//        e.preventDefault()
//        console.log(this.state.fields)
//    }

  render() {
    return (
      <div>
        {/* <ExampleComponent text='Modern React component module' /> */}
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
          getSubmit = {this.submitHandle}
        >
          child component
        <div id="login"  >
          {/* <div className ={this.submitHandle}> */}
          <h1>Login page</h1>
         <form method="post" name="userLoginForm" onSubmit={this.submitHandle}>
         {/* <form getSubmit = {this.submitHandle}> */}
            <label>emailId*:</label>
            <input type="text" name="email" value={this.state.fields.email} onChange={this.handleChange} placeholder="enter userName" />
            <div className="errorMsg" >{this.state.errors.email}</div>

            <br /> <br />
            <label>password*:</label>
            <input type="password" name="password" value={this.state.fields.password} onChange={this.handleChange} placeholder="enter password" />
            <div className = "errorMsg">{this.state.errors.password}</div>

            <br />
            <label></label>
            <input type="submit" className="button" value="login" />
             </form>
       </div>
       {/* </div> */}
        </Login>
      </div>
    )
  }
}
