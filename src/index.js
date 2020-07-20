import { find, filter, forEach, map } from 'lodash-es';


class BigBrother {
  constructor(isDevMode = false, isDebug = false) {
    this.isDevMode = isDevMode;
    this.isDebug = isDebug;
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

    if (isFormValid) {
      // Fire off the isValid callback method
      if (onIsValidCallback)
        onIsValidCallback();
    }

    if (!isFormValid) {
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

      if (component.id === undefined)
        throw new Error('component id is required');

      if (component.value === undefined)
        throw new Error('value cannot be undefined. You can set to an empty string if you do not wish to provide a value.');

      // if (component.isValid === undefined)
      //   throw new Error('isValid is required');

      if (component.isRequired === undefined)
        throw new Error('isRequired is required');

      if (component.isVisible === undefined)
        throw new Error('isVisible is required');

      if (component.isDisabled === undefined)
        throw new Error('isDisabled is required');


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
    if (component.isValid === false && component.isVisible === true) {
      if (this.isDebug) console.log('hit #1: component.isValid === false && component.isVisible === true', component);
      return false;
    } else if (component.isValid === false && component.isVisible === false) {
      if (this.isDebug) console.log('hit #2: component.isValid === false && component.isVisible === false', component);
      return true;
    } else if (component.isValid === true && component.isDisabled === true) {
      if (this.isDebug) console.log('hit #3: component.isValid === true && component.isDisabled === true', component);
      return true;
    } else if (component.isValid === false && component.isVisible === false && component.isDisabled === false) {
      return true;
    }
    else {
      if (component.isRequired === false) {
        if (this.isDebug) console.log('hit #4: component.isRequired === false', component);
        return true;
      } else if (component.isRequired === true && component.isDisabled === false && component.value) {
        if (this.isDebug) console.log('hit #5: component.isRequired === true && component.isDisabled === false && component.value', component);
        return true;
      } else if (component.isRequired === true && component.isDisabled === true && component.value) {
        if (this.isDebug) console.log('hit #6: component.isRequired === true && component.isDisabled === true && component.value', component);
        return false;
      } else if (component.isRequired === true && component.isVisible === true && !component.value) {
        if (this.isDebug) console.log('hit #7: component.isRequired === true && component.isVisible === true && !component.value', component);
        return false;
      } else if (component.isRequired === true && component.isVisible === false && !component.value) {
        if (this.isDebug) console.log('hit #8: component.isRequired === true && component.isVisible === false && !component.value', component);
        return true;
      } else if (component.isRequired === true && component.isVisible === true && component.value) {
        if (this.isDebug) console.log('hit #9: component.isRequired === true && component.isVisible === true && component.value', component);
        return true;
      } else if (component.isRequired === true && component.isVisible === true) {
        if (this.isDebug) console.log('hit #10: component.isRequired === true && component.isVisible === true', component);
        return false;
      } else if (component.isRequired === true && component.isVisible === false) {
        if (this.isDebug) console.log('hit #11: component.isRequired === true && component.isVisible === false', component);
        return true;
      } else if (component.isRequired === true && component.isDisabled === true) {
        if (this.isDebug) console.log('hit #12: component.isRequired === true && component.isDisabled === true', component);
        return false;
      } else {
        if (this.isDebug) console.log('hit #13: else', component);
        return false;
      }
    };
  }


  _areComponentsValid(components) {
    // loop over registered components
    // and make sure their isValid properties are all set to true
    // if any component is not valid then the whole batch is invalid
    let isComponentValid = false;

    forEach(components, component => {
      let isValid = this._determineComponentValidityBasedOnArguments(component);

      // check the validity of the registered component
      if (isValid) {
        isComponentValid = true;
      } else {
        isComponentValid = false;
        return false;
      }
    });

    console.log('IS VALID: ', isComponentValid);
    return isComponentValid;
  }


  isValid() {
    const isFormValid = this._areComponentsValid(this.registeredComponents);

    return isFormValid;
  }
}


export default BigBrother;