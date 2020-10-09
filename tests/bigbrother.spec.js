import expect from 'expect'
import BigBrother from '../src';


describe('Given I am registering component(s) with BigBrother', () => {

  describe('when component id property is not set', () => {
    it('it should throw Component Id is required exception', () => {
      const bigBrother = new BigBrother();

      expect(() => {
        bigBrother.registerComponents([
          { isRequired: true, value: '', isValid: false, isVisible: true, isDisabled: false }
        ]);

        bigBrother.isValid();
      }).toThrow('component id is required')
    })
  });


  describe('when value property is not set', () => {
    it('it should throw value cannot be undefined exception', () => {
      const bigBrother = new BigBrother();

      expect(() => {
        bigBrother.registerComponents([
          { id: 'name', isValid: false, isRequired: true, isVisible: true, isDisabled: false }
        ]);

        bigBrother.isValid();
      }).toThrow('value cannot be undefined. You can set to an empty string if you do not wish to provide a value.');
    })
  });


  describe('when isRequired property is not set', () => {
    it('it should throw isRequired is required exception', () => {
      const bigBrother = new BigBrother();

      expect(() => {
        bigBrother.registerComponents([
          { id: 'name', value: '', isValid: false, isVisible: true, isDisabled: false }
        ]);

        bigBrother.isValid();
      }).toThrow('isRequired is required')
    })
  });


  describe('when isVisible property is not set', () => {
    it('it should throw isVisible is required exception', () => {
      const bigBrother = new BigBrother();

      expect(() => {
        bigBrother.registerComponents([
          { id: 'name', value: '', isValid: false, isRequired: true, isDisabled: false }
        ]);

        bigBrother.isValid();
      }).toThrow('isVisible is required')
    })
  });



  describe('when isDisabled property is not set', () => {
    it('it should throw isDisabled is required exception', () => {
      const bigBrother = new BigBrother();

      expect(() => {
        bigBrother.registerComponents([
          { id: 'name', value: '', isValid: false, isRequired: true, isVisible: false }
        ]);

        bigBrother.isValid();
      }).toThrow('isDisabled is required')
    })
  });

});


describe('Given the initial page load', () => {
  describe('When isValid is false AND !isVisible AND !isDisabled', () => {
    it('bigBrother.isValid should be true', () => {
      const bigBrother = new BigBrother();

      bigBrother.registerComponents([
        { id: 'name', isRequired: false, value: '', isVisible: true, isDisabled: false }
      ]);

      expect(bigBrother.isValid()).toBeTruthy();
    });
  })
});