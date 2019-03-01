import expect from 'expect'
import BigBrother from '../src';


describe('Given the initial page load AND only 1 item registered AND form is NOT dirty', () => {
  describe('When value is empty', () => (
    it('bigBrother.isValid should be false', () => {
      const bigBrother = new BigBrother(false);
      const isFormDirty = false;

      bigBrother.registerComponents([
        { id: 'name', isValid: true, value: '', isRequired: true, isVisible: true, isDisabled: false }
      ]);

      expect(bigBrother.isValid()).toBeFalsy();
    })
  ));


  describe('When value is NOT empty', () => (
    it('bigBrother.isValid should be true', () => {
      const bigBrother = new BigBrother(false);
      const isFormDirty = false;

      bigBrother.registerComponents([
        { id: 'name', isValid: true, value: 'chris', isRequired: true, isVisible: true, isDisabled: false }
      ]);

      expect(bigBrother.isValid()).toBeTruthy();
    })
  ));
});



describe('Given the initial page load AND MORE than 1 item registered AND form is NOT dirty', () => {
  describe('When both values are empty', () => (
    it('bigBrother.isValid should be false', () => {
      const bigBrother = new BigBrother(false);
      const isFormDirty = false;

      bigBrother.registerComponents([
        { id: 'name', isValid: true, value: '', isRequired: true, isVisible: true, isDisabled: false },
        { id: 'email', isValid: true, value: '', isRequired: true, isVisible: true, isDisabled: false }
      ]);

      expect(bigBrother.isValid()).toBeFalsy();
    })
  ));


  describe('When values are NOT empty', () => (
    it('bigBrother.isValid should be true', () => {
      const bigBrother = new BigBrother(false);
      const isFormDirty = false;

      bigBrother.registerComponents([
        { id: 'name', isValid: true, value: 'chris', isRequired: true, isVisible: true, isDisabled: false },
        { id: 'email', isValid: true, value: 'chris@biscuits.com', isRequired: true, isVisible: true, isDisabled: false }
      ]);

      expect(bigBrother.isValid()).toBeTruthy();
    })
  ));


  describe('When 1 value is NOT empty AND 1 IS empty', () => (
    it('bigBrother.isValid should be false', () => {
      const bigBrother = new BigBrother(false);
      const isFormDirty = false;

      bigBrother.registerComponents([
        { id: 'name', isValid: true, value: 'chris', isRequired: true, isVisible: true, isDisabled: false },
        { id: 'email', isValid: true, value: '', isRequired: true, isVisible: true, isDisabled: false }
      ]);

      expect(bigBrother.isValid()).toBeFalsy();
    })
  ));
});


// More to come!