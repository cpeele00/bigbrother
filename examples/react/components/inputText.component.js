import React, { Component } from 'react';
import classnames from 'classnames';


/**
 * SimpleText
 * NOTE: SimpleText is a PRESENTATIONAL / DUMB Component that is 
 * decoupled from any redux methods or code and agnostic to any outside form validation.
 * SimpleText was inspired by the great work Mike Paravano did on his InputText and InputPhone redux controls.
 * NOTE: The "Simple" line of components will be shared and published via NPM to Paylocity's internal NPM Repo
 * So please keep these components DUMB and the logic clean and simple
 */
class InputText extends Component {
  static propTypes = {
    id: React.PropTypes.string.isRequired,
    isRequired: React.PropTypes.bool.isRequired,
    onChange: React.PropTypes.func.isRequired,
    isFormDirty: React.PropTypes.bool.isRequired,
    value: React.PropTypes.string.isRequired,

    title: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    cssClasses: React.PropTypes.string,
    maxLength: React.PropTypes.number,
    isMultiline: React.PropTypes.bool,
    multilineRows: React.PropTypes.number,
    isVisible: React.PropTypes.bool,
    isDisabled: React.PropTypes.bool,
    tabIndex: React.PropTypes.number,
    errorMessage: React.PropTypes.string,
    excludeChars: React.PropTypes.array,
    regEx: React.PropTypes.object,
    regExErrorMessage: React.PropTypes.string,
    customValidation: React.PropTypes.func,
    customErrorMessage: React.PropTypes.string,
    onVisibilityChanged: React.PropTypes.func,
    onValidated: React.PropTypes.func
  };


  render() {
    let wrapperCss = classnames('form-group', {
      '': this.state.isValid || !this.props.isFormDirty,
      'form-error': this.state.isRequired && this.state.isVisible && ((!this.isValid) && this.props.isFormDirty)
    });

    return (
      <div className={wrapperCss}>
        {this.renderFormLabel()}
        {this.renderTextBox()}
        {this.renderTextArea()}
        {this.renderErrorMessage()}
      </div>
    );
  }


  constructor(props) {
    super(props);

    this.isValid = false;
    this.errorMessage = this.props.errorMessage || '';
    this.tabIndex = this.props.tabIndex || 1;
    this.isPristine = true;

    this.state = {
      isValid: false,
      value: this.props.value || '',
      isVisible: this.props.isVisible == undefined ? true : this.props.isVisible,
      isRequired: this.props.isRequired
    };


    this.validate(this.props.isFormDirty, this.props.isVisible, true);

    this.handleOnChange = this.handleOnChange.bind(this);
  }


  componentWillReceiveProps(nextProps) {
    if (this.state.value !== nextProps.value)
      this.setState({ value: nextProps.value }, () => this.validate(nextProps.isFormDirty, nextProps.isVisible));


    if (this.props.isVisible !== nextProps.isVisible){
      this.setState({isVisible: nextProps.isVisible}, () => {

        this.validate(nextProps.isFormDirty, nextProps.isVisible);

        if (this.props.onVisibilityChanged)
          this.props.onVisibilityChanged(nextProps.isVisible, this.props.id, this.props.isRequired, this.isValid);
      });
    }


    if (this.props.isRequired !== nextProps.isRequired){
      this.setState({isRequired: nextProps.isRequired}, () => {
        this.validate(nextProps.isFormDirty, nextProps.isVisible);
      });
    } else {
      this.validate(nextProps.isFormDirty, nextProps.isVisible);
    }
  }


  componentWillUpdate(nextProps, nextState){
    if (this.isValid !== this.state.isValid)
      this.isValid = this.validate(nextProps.isFormDirty, nextState.isVisible);
  }


  renderFormLabel(){
    if (!this.state.isVisible)
      return null;

    if (!this.props.isRequired)
      return <label htmlFor={this.props.id}>{this.props.title}<em> (optional)</em></label>;
    else
      return <label htmlFor={this.props.id}>{this.props.title}</label>;
  }


  renderTextBox() {
    if (!this.props.isMultiline && this.state.isVisible)
      return (
        <input
          id={this.props.id}
          className={this.props.cssClasses}
          type="text"
          value={this.state.value}
          onChange={this.handleOnChange}
          placeholder={this.props.placeholder}
          tabIndex={this.props.tabIndex}
          disabled={this.props.isDisabled}
          maxLength={this.props.maxLength} />
      );
  }


  renderTextArea() {
    if (this.props.isMultiline && this.state.isVisible)
      return (
        <textarea
          id={this.props.id}
          className={this.props.cssClasses}
          value={this.state.value}
          rows={this.props.multilineRows}
          onChange={this.handleOnChange}
          placeholder={this.props.placeholder}
          disabled={this.props.isDisabled}
          tabIndex={this.props.tabIndex}
          maxLength={this.props.maxLength} />
      );
  }


  renderErrorMessage() {
    if (!this.state.isVisible)
      return null;

    if (this.props.isRequired && this.state.isVisible && (!this.isValid && this.props.isFormDirty))
      return <span className="type-footnote">{this.errorMessage}</span>;
  }


  handleOnChange(e) {
    let value = e.target.value;

    this.isPristine = false;

    this.setState({ value }, () => {
      this.validate(this.props.isFormDirty, this.props.isVisible);

      if (this.props.onChange)
        this.props.onChange(this.props.id, value);
    });
  }


  validate(isFormDirty, isVisible, isCalledFromConstructor = false) {
    let isValid = true;

    isValid = this.validatePresenceOf(isValid, isFormDirty);
    isValid = this.validateMaxLength(isValid, isFormDirty);
    isValid = this.validateInvalidChars(isValid, isFormDirty);
    isValid = this.validateRegEx(isValid, isFormDirty);
    isValid = this.runCustomValidation(isValid, isFormDirty);

    // Final isValid result
    this.isValid = isValid;

    if (!isCalledFromConstructor)
      this.setState({isValid: this.isValid});

    if (this.props.onValidated && !this.isPristine)
      this.props.onValidated(this.props.id, this.isValid, this.props.isRequired, isVisible);

    return isValid;
  }


  runCustomValidation(isValid, isFormDirty){
    if (!isFormDirty)
      return isValid;

    if (!this.props.customValidation)
      return isValid;

    if (!this.state.value)
      return isValid;
    
    // If any custom validation criteria was added
    // then run it
    if(this.props.customValidation(this.state.value) === false){
      isValid = false;
      this.errorMessage = this.props.customErrorMessage;
    }

    return isValid;
  }


  validatePresenceOf(isValid, isFormDirty) {
    if (!isFormDirty)
      return isValid;

    if (this.state.isRequired && (!this.state.value || this.state.value.length <= 0)) {
      isValid = false;
      this.errorMessage = this.props.title.replace(':', '') + ' is required';
    }

    return isValid;
  }


  validateMaxLength(isValid, isFormDirty) {
    if (!isFormDirty)
      return isValid;

    if (this.state.value && this.state.value.length > 0) {
      if (this.props.maxLength && this.state.value.length > this.props.maxLength) {
        isValid = false;
        this.errorMessage = this.props.title.replace(':', '') + ' can have a maximum length of ' + this.props.maxLength + ' characters. It is currently ' + this.state.value.length + '.';
      }
    }

    return isValid;
  }


  validateInvalidChars(isValid, isFormDirty) {
    if (!isFormDirty)
      return isValid;

    if (isValid && this.props.excludeChars) {
      for (let char of this.props.excludeChars) {
        if (this.state.value.indexOf(char) >= 0) {
          isValid = false;
          this.errorMessage = this.props.title.replace(':', '') + ' cannot contain the character \'' + char + '\'.';
          return isValid;
        }
      }
    }

    return isValid;
  }


  validateRegEx(isValid, isFormDirty) {
    if (!isFormDirty)
      return isValid;

    if (!this.props.regEx)
      return isValid;

    if (!this.state.value)
      return isValid;


    if (this.props.regEx.test(this.state.value) === false) {
      isValid = false;

      if (this.props.regExErrorMessage)
        this.errorMessage = this.props.regExErrorMessage;
      else
        this.errorMessage = 'The value you have entered is invalid.';
    }

    return isValid;
  }
}


export default InputText;