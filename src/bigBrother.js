import find from 'lodash/find';
import filter from 'lodash/filter';
import forEach from 'lodash/forEach';


class BigBrother {

  constructor(isDevMode = false) {
    this.isDevMode = isDevMode;
    this.isFormValid = false;
    this.currentRequiredItems = 0;
    this.minRequiredFieldCount = null;
    this.errors = [];
    this.validItems = [];
  }


  setMinRequiredFieldCount(minRequiredFieldCount) {
    this.minRequiredFieldCount = minRequiredFieldCount;
    this.currentRequiredItems = minRequiredFieldCount;
  }


  setValidity(isFormDirty, componentId, isComponentValid, isRequired = false, isVisible = true, onInvalidCallback, onIsValidCallback) {
    if (!isRequired)
      return;

    if (!isVisible) {
      this._handleComponentNotVisibleValidation(isFormDirty);
      return;
    }


    // STEP 1) Track our valid and invalid items
    if (isComponentValid)
      this._trackValidItems(componentId, isComponentValid);
    else
      this._trackInvalidItems(componentId, isComponentValid);


    // STEP 2) If we have no errors and the number of required items has been satisfied
    // Then the form is valid
    if (this.errors.length === 0 && (this.validItems.length === this.currentRequiredItems))
      this.isFormValid = true;
    else
      this.isFormValid = false;


    // STEP 3) If the form is dirty (the user tried to submit it) and
    // the form is valid
    if (isFormDirty && this.isFormValid) {
      // Fire off the isValid callback method
      if (onIsValidCallback)
        onIsValidCallback();
    }

    // Otherwise, if the form is dirty and the form is invalid
    if (isFormDirty && !this.isFormValid) {
      // Fire off the invalid callback method
      if (onInvalidCallback)
        onInvalidCallback();
    }
  }


  isValid() {
    if (this.isFormValid){
      if (this.isDevMode)
        this.logInvalidAndValid();

      return true;

    } else if (this.errors.length === 0 && (this.validItems.length === this.currentRequiredItems))
      return true;
    else {
      if (this.isDevMode)
        this.logInvalidAndValid();

      return false;
    }
  }


  logInvalidAndValid() {
    let validItems = this.validItems.slice();
    let errors = this.errors.slice();
    let allResults = validItems.concat(errors);

    console.log('max required items count: ' + this.maxRequiredFieldCount);
    console.log('min required items count: ' + this.minRequiredFieldCount);
    console.log('current required items count: ' + this.currentRequiredItems);
    console.log('invalid items count: ' + errors.length);
    console.log('valid items count: ' + validItems.length);
    console.log('overall valid status: ' + this.isFormValid);
    console.table(allResults);
  }


  logInvalid() {
    console.table(this.errors);
  }


  logIsValid() {
    console.table(this.validItems);
  }


  registerComponent(componentId, isValid = false) {
    if (isValid)
      this._trackValidItems(componentId, true);
    else
      this._trackInvalidItems(componentId, false);

    this.currentRequiredItems++;
  }


  unRegisterComponent(componentId) {
    this.validItems = filter(this.validItems, x => x.componentId !== componentId);
    this.errors = filter(this.errors, error => error.componentId !== componentId);

    let tempRequiredItemsCount = this._decrementRequiredCount(this.currentRequiredItems);

    if (this.minRequiredFieldCount) {
      if (tempRequiredItemsCount > this.minRequiredFieldCount)
        this.currentRequiredItems--;
    } else {
      this.currentRequiredItems--;
    }
  }


  initializeComponentsAsValid(components){
    if (components && components.length > 0){
      forEach(components, (component) => {
        this._trackValidItems(component, true);
      });

      this.isFormValid = true;
    }
  }


  _decrementRequiredCount(requiredCount) {
    let tempRequiredCount = requiredCount;

    return tempRequiredCount--;
  }


  _trackValidItems(componentId, isComponentValid) {
    if (!find(this.validItems, validItems => validItems.componentId === componentId)) {
      this.validItems.push({ componentId, isComponentValid });
      this.errors = filter(this.errors, error => error.componentId !== componentId);
    }
  }


  _trackInvalidItems(componentId, isComponentValid) {
    if (!find(this.errors, invalidItems => invalidItems.componentId === componentId)) {
      this.validItems = filter(this.validItems, x => x.componentId !== componentId);
      this.errors.push({ componentId, isComponentValid });
    }
  }


  _handleComponentNotVisibleValidation(isFormDirty){
    if (this.errors.length === 0 && (this.validItems.length === this.currentRequiredItems))
      this.isFormValid = true;
    else
      this.isFormValid = false;
    
    
    if (isFormDirty && this.isFormValid) {
      // Fire off the isValid callback method
      if (onIsValidCallback)
        onIsValidCallback();
    }
  }

}


export default BigBrother;