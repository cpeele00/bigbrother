import { find, filter, forEach, map } from 'lodash-es';


class BigBrotherV2 {

  constructor(isDevMode = false) {
    this.isDevMode = isDevMode;
    this.registeredComponents = [];
  }


  registerComponents(components) {
    forEach(components, component => {
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
    if (find(this.registeredComponents, component => component.id))
      this.registeredComponents = filter(this.registeredComponents, x => x.id !== component.id);

    return this.isValid();
  }


  makeAllValid() {
    this.registeredComponents = map(this.registeredComponents, component => {
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

    this.registeredComponents = map(this.registeredComponents, component => {
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

    const validItems = filter(registeredComponents, x => x.isValid === true);
    const invalidItems = filter(registeredComponents, x => x.isValid === false);

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
    if (!find(this.registeredComponents, x => x.id === component.id)) {

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

    forEach(components, component => {
      let isValid = this._determineComponentValidityBasedOnArguments(component);

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


export default BigBrotherV2;