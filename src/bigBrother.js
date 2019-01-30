class BigBrother {
  constructor(isDevMode = false) {
    this.isDevMode = isDevMode;
    this.isFormValid = false;
    this.registeredComponents = [];
  }


  registerComponents(components) {
    components.forEach(component => {
      this._trackComponent(component);
    });

    this._logValidStatus(this.registeredComponents);

    return this.isValid();
  }


  registerComponent(component) {
    this._trackComponent(component);

    this._logValidStatus(this.registeredComponents);

    return this.isValid();
  }


  isValid() {
    const isFormValid = this._areComponentsValid(this.registeredComponents);

    return isFormValid;
  }


  unregisterComponent(component) {
    if (this.registeredComponents.find(component => component.id))
      this.registeredComponents = this.registeredComponents.filter(x => x.id !== component.id);

    return this.isValid();
  }


  makeAllValid() {
    this.registeredComponents = this.registeredComponents.map(component => {
      return {
        id: component.id,
        value: '',
        isValid: true,
        isRequired: component.isRequired,
        isVisible: component.isVisible,
        isDisabled: component.isDisabled
      };
    });


    this._logValidStatus(this.registeredComponents);
  }


  setValidity(isFormDirty, componentId, isComponentValid, shouldValidate = false, isVisible = true, isDisabled = false, value = '', onIsValidCallback, onInvalidCallback) {
    if (!shouldValidate)
      return;


    this.registeredComponents = this.registeredComponents.map(component => {
      return component.id === componentId ? { ...component, isValid: isComponentValid, isVisible, isDisabled, value } : component;
    });


    const isFormValid = this._areComponentsValid(this.registeredComponents);


    if (isFormDirty && isFormValid) {
      // Fire off the isValid callback method
      if (onIsValidCallback)
        onIsValidCallback();
    }


    if (isFormDirty && !isFormValid) {
      // Fire off the invalid callback method
      if (onInvalidCallback)
        onInvalidCallback();
    }


    this._logValidStatus(this.registeredComponents);
  }


  _logValidStatus(registeredComponents) {
    if (!this.isDevMode)
      return;

    const validItems = registeredComponents.filter(x => x.isValid === true);
    const invalidItems = registeredComponents.filter(x => x.isValid === false);

    console.log('===========================================================');
    console.log('                 BIG BROTHER DEBUGIFICATION                ');
    console.log('===========================================================');
    console.log('Current registered components count: ' + registeredComponents.length);
    console.log('Valid components count: ' + validItems.length);
    console.log('Invalid components count: ' + invalidItems.length);
    console.log('Overall form validity status: ' + this.isValid());
    console.table(registeredComponents);
  }


  _trackComponent(component) {
    if (!this.registeredComponents.find(x => x.id === component.id)) {

      if (!component.id)
        throw new Error('Component id is required');

      const isValid = this._determineComponentValidityBasedOnArguments(component);

      this.registeredComponents.push({
        id: component.id,
        value: component.value,
        isValid: isValid,
        isRequired: component.isRequired || false,
        isVisible: component.isVisible || true,
        isDisabled: component.isDisabled || false
      });
    }
  }


  _determineComponentValidityBasedOnArguments(component) {
    const isComponentValid = () => {
      if (component.isValid === false && component.isVisible === true)
        return false;
      else if (component.isValid === false && component.isVisible === false)
        return true;
      else if (component.isValid === true && component.isDisabled === true)
        return true;
      else {
        if (component.isRequired === false)
          return true;
        else if (component.isRequired === true && component.isDisabled === false && component.value)
          return true;
        else if (component.isRequired === true && component.isDisabled === true && component.value)
          return false;
        else if (component.isRequired === true && component.isVisible === true && !component.value)
          return false;
        else if (component.isRequired === true && component.isVisible === false && !component.value)
          return true;
        else if (component.isRequired === true && component.isVisible === true && component.value)
          return true;
        else if (component.isRequired === true && component.isVisible === true)
          return false;
        else if (component.isRequired === true && component.isVisible === false)
          return true;
        else if (component.isRequired === true && component.isDisabled === true)
          return false;
        else
          return false;
      }
    };

    const isValid = isComponentValid();

    return isValid;
  }


  _areComponentsValid(components) {
    // loop over registered components
    // and make sure their isValid properties are all set to true
    // if any component is not valid then the whole batch is invalid
    let isComponentValid = false;

    components.forEach(component => {
      const isValid = this._determineComponentValidityBasedOnArguments(component);

      // check the validity of the registered component
      if (isValid) { //TODO: i might have to add the determin check here...
        isComponentValid = true;
      } else {
        isComponentValid = false;
        return false;
      }
    });


    return isComponentValid;
  }
}


export default BigBrother;