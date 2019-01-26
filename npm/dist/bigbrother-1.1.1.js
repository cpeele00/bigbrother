'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _find = require('lodash/find');

var _find2 = _interopRequireDefault(_find);

var _filter = require('lodash/filter');

var _filter2 = _interopRequireDefault(_filter);

var _forEach = require('lodash/forEach');

var _forEach2 = _interopRequireDefault(_forEach);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BigBrother = function () {
  function BigBrother() {
    var isDevMode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    _classCallCheck(this, BigBrother);

    this.isDevMode = isDevMode;
    this.isFormValid = false;
    this.currentRequiredItems = 0;
    this.minRequiredFieldCount = null;
    this.errors = [];
    this.validItems = [];
  }

  _createClass(BigBrother, [{
    key: 'setMinRequiredFieldCount',
    value: function setMinRequiredFieldCount(minRequiredFieldCount) {
      this.minRequiredFieldCount = minRequiredFieldCount;
      this.currentRequiredItems = minRequiredFieldCount;
    }
  }, {
    key: 'setValidity',
    value: function setValidity(isFormDirty, componentId, isComponentValid) {
      var isRequired = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var isVisible = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
      var onInvalidCallback = arguments[5];
      var onIsValidCallback = arguments[6];

      if (!isRequired) return;

      if (!isVisible) {
        this._handleComponentNotVisibleValidation(isFormDirty);
        return;
      }

      // STEP 1) Track our valid and invalid items
      if (isComponentValid) this._trackValidItems(componentId, isComponentValid);else this._trackInvalidItems(componentId, isComponentValid);

      // STEP 2) If we have no errors and the number of required items has been satisfied
      // Then the form is valid
      if (this.errors.length === 0 && this.validItems.length === this.currentRequiredItems) this.isFormValid = true;else this.isFormValid = false;

      // STEP 3) If the form is dirty (the user tried to submit it) and
      // the form is valid
      if (isFormDirty && this.isFormValid) {
        // Fire off the isValid callback method
        if (onIsValidCallback) onIsValidCallback();
      }

      // Otherwise, if the form is dirty and the form is invalid
      if (isFormDirty && !this.isFormValid) {
        // Fire off the invalid callback method
        if (onInvalidCallback) onInvalidCallback();
      }
    }
  }, {
    key: 'isValid',
    value: function isValid() {
      if (this.isFormValid) {
        if (this.isDevMode) this.logInvalidAndValid();

        return true;
      } else if (this.errors.length === 0 && this.validItems.length === this.currentRequiredItems) return true;else {
        if (this.isDevMode) this.logInvalidAndValid();

        return false;
      }
    }
  }, {
    key: 'logInvalidAndValid',
    value: function logInvalidAndValid() {
      var validItems = this.validItems.slice();
      var errors = this.errors.slice();
      var allResults = validItems.concat(errors);

      console.log('max required items count: ' + this.maxRequiredFieldCount);
      console.log('min required items count: ' + this.minRequiredFieldCount);
      console.log('current required items count: ' + this.currentRequiredItems);
      console.log('invalid items count: ' + errors.length);
      console.log('valid items count: ' + validItems.length);
      console.log('overall valid status: ' + this.isFormValid);
      console.table(allResults);
    }
  }, {
    key: 'logInvalid',
    value: function logInvalid() {
      console.table(this.errors);
    }
  }, {
    key: 'logIsValid',
    value: function logIsValid() {
      console.table(this.validItems);
    }
  }, {
    key: 'registerComponent',
    value: function registerComponent(componentId) {
      var isValid = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (isValid) this._trackValidItems(componentId, true);else this._trackInvalidItems(componentId, false);

      this.currentRequiredItems++;
    }
  }, {
    key: 'unRegisterComponent',
    value: function unRegisterComponent(componentId) {
      this.validItems = (0, _filter2.default)(this.validItems, function (x) {
        return x.componentId !== componentId;
      });
      this.errors = (0, _filter2.default)(this.errors, function (error) {
        return error.componentId !== componentId;
      });

      var tempRequiredItemsCount = this._decrementRequiredCount(this.currentRequiredItems);

      if (this.minRequiredFieldCount) {
        if (tempRequiredItemsCount > this.minRequiredFieldCount) this.currentRequiredItems--;
      } else {
        this.currentRequiredItems--;
      }
    }
  }, {
    key: 'initializeComponentsAsValid',
    value: function initializeComponentsAsValid(components) {
      var _this = this;

      if (components && components.length > 0) {
        (0, _forEach2.default)(components, function (component) {
          _this._trackValidItems(component, true);
        });

        this.isFormValid = true;
      }
    }
  }, {
    key: '_decrementRequiredCount',
    value: function _decrementRequiredCount(requiredCount) {
      var tempRequiredCount = requiredCount;

      return tempRequiredCount--;
    }
  }, {
    key: '_trackValidItems',
    value: function _trackValidItems(componentId, isComponentValid) {
      if (!(0, _find2.default)(this.validItems, function (validItems) {
        return validItems.componentId === componentId;
      })) {
        this.validItems.push({ componentId: componentId, isComponentValid: isComponentValid });
        this.errors = (0, _filter2.default)(this.errors, function (error) {
          return error.componentId !== componentId;
        });
      }
    }
  }, {
    key: '_trackInvalidItems',
    value: function _trackInvalidItems(componentId, isComponentValid) {
      if (!(0, _find2.default)(this.errors, function (invalidItems) {
        return invalidItems.componentId === componentId;
      })) {
        this.validItems = (0, _filter2.default)(this.validItems, function (x) {
          return x.componentId !== componentId;
        });
        this.errors.push({ componentId: componentId, isComponentValid: isComponentValid });
      }
    }
  }, {
    key: '_handleComponentNotVisibleValidation',
    value: function _handleComponentNotVisibleValidation(isFormDirty) {
      if (this.errors.length === 0 && this.validItems.length === this.currentRequiredItems) this.isFormValid = true;else this.isFormValid = false;

      if (isFormDirty && this.isFormValid) {
        // Fire off the isValid callback method
        if (onIsValidCallback) onIsValidCallback();
      }
    }
  }]);

  return BigBrother;
}();

module.exports = BigBrother;