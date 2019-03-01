import React from 'react';
import BigBrother from '../../src';
import { withFlashMessageContext } from './flashMessage';
import bbLogo from './bb-logo-red-alt.png';


// Set default FormDirty state
let isFormDirty = false;
// Instantiate BigBrother and set debug tools to true
const bigBrother = new BigBrother(true);

const Login = props => {
  // Register your form's components/controls here specifying their defaults
  bigBrother.registerComponents([
    { id: 'name', isValid: true, value: '', isRequired: true, isVisible: true, isDisabled: false },
    { id: 'email', isValid: true, value: '', isRequired: true, isVisible: true, isDisabled: false },
    { id: 'phone', isValid: true, value: '', isRequired: false, isVisible: true, isDisabled: false }
  ]);

  return (
    <React.Fragment>
      <header className="big-brother-header">
        <div className="big-brother-logo-container">
          <img src={bbLogo} alt="big brother logo" />
          <h3 className="demo-type-header">React Demo</h3>
          <figure className="top-margin-med">
            <span className="tip-bold">
              <i className="far fa-lightbulb"></i>
              Tip!
            </span>
            <span>Open up your Chrome or Firefox dev tools to view Big Brother's validation debugger.</span>
          </figure>
        </div>
      </header>

      <div className="container-fluid h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-md-6 col-lg-6 col-sm-6">
            <form onSubmit={handleSubmit}>
              <div className="form-group">

                <input id="name" className="form-control textbox-dark" placeholder="enter name (required)"
                  onChange={e => {
                    const value = e.target.value;
                    const isNameValid = !!value;

                    // Lets call our form's validate function while passing in
                    // some basic things about this component (isValid, isVisable, isDisabled, etc...)
                    handleOnValidate('name', isNameValid, true, true, false, value);
                  }}
                />

              </div>
              <div className="form-group mt-3">

                <input id="email" className="form-control textbox-dark" placeholder="enter email (required)"
                  onChange={e => {
                    const value = e.target.value;
                    const isEmailValid = !!value;

                    // Lets call our form's validate function while passing in
                    // some basic things about this component (isValid, isVisable, isDisabled, etc...)
                    handleOnValidate('email', isEmailValid, true, true, false, value);
                  }}
                />

              </div>
              <div className="form-group mt-3">

                <input id="phone" className="form-control textbox-dark" placeholder="enter phone"
                  onChange={e => {
                    const value = e.target.value;

                    handleOnValidate('phone', true, true, true, false, value);
                  }}
                />

              </div>
              <button className="btn btn-light btn-block mt-4">Login</button>
            </form>
          </div>
        </div>

      </div>
    </React.Fragment>
  );


  function handleSubmit(e) {
    e.preventDefault();
    // The user attempted to submit the form so it's now dirty
    isFormDirty = true;

    if (isFormDirty) {
      // Get the form's overall validity with BigBrother's isValid() function
      if (bigBrother.isValid()) {
        // Here you can proceed with submitting your form to your api or backend
        // but for simplicities sake all we are going to do here is just simply show a success message
        props.flashMessageContext.actions.showMessage('success', 'Login successful!');
      } else {
        // Let the user know how naughty they've been.
        props.flashMessageContext.actions.showMessage('error', "You've got some issues...");
      }
    }
  }


  function handleOnValidate(componentId, isValid, shouldValidate, isVisible, isDisabled, value) {
    // This is where the magic happens. Make a call to BigBrother's setValidity method with the information
    // it needs in order to determine the form's validity.
    bigBrother.setValidity(isFormDirty, componentId, isValid, shouldValidate, isVisible, isDisabled, value, () => {
      // Success! Here is a good place to show a success message banner, hide an error banner
      // or anything else you want to do if your form is valid when your component's onChange event fires
      if (isFormDirty)
        // Lets make a call to our the flashMessage context api
        props.flashMessageContext.actions.showMessage('');
    }, () => {
      // Error! This is a good place to show the user an error banner for your form or disable form
      // elements if the form is in an invalid state
      if (isFormDirty)
        // Lets make a call to our the flashMessage context api
        props.flashMessageContext.actions.showMessage('error', "You've got some issues...");
    }
    );
  }
};


export default withFlashMessageContext(Login);
