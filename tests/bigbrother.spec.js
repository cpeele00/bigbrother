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


  // describe('when isValid property is not set', () => {
  //   it('it should throw isValid cannot be undefined exception', () => {
  //     const bigBrother = new BigBrother();

  //     expect(() => {
  //       bigBrother.registerComponents([
  //         { id: 'name', value: '', isRequired: true, isVisible: true, isDisabled: false }
  //       ]);

  //       bigBrother.isValid();
  //     }).toThrow('isValid is required');
  //   })
  // });


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


// describe('Given the initial page load', () => {

//   describe('When isRequired is false AND !value AND isVisible AND !isDisabled', () => {
//     it('bigBrother.isValid should be true', () => {
//       const bigBrother = new BigBrother();

//       bigBrother.registerComponents([
//         { id: 'name', isRequired: false, value: '', isVisible: true, isDisabled: false }
//       ]);

//       expect(bigBrother.isValid()).toBeTruthy();
//     })
//   });


//   describe('When isRequired is true AND !value AND isVisible AND !isDisabled', () => {
//     it('bigBrother.isValid should be false', () => {
//       const bigBrother = new BigBrother();

//       bigBrother.registerComponents([
//         { id: 'name', isRequired: true, value: '', isVisible: true, isDisabled: false }
//       ]);

//       expect(bigBrother.isValid()).toBeFalsy();
//     })
//   });


//   describe('When isVisible is false AND isRequired AND !value AND !isDisabled', () => {
//     it('bigBrother.isValid should be true', () => {
//       const bigBrother = new BigBrother();

//       bigBrother.registerComponents([
//         { id: 'name', isRequired: true, value: '', isVisible: false, isDisabled: false }
//       ]);

//       expect(bigBrother.isValid()).toBeTruthy();
//     })
//   });


//   describe('When isDisabled is true AND isRequired AND !value AND isVisible', () => {
//     it('bigBrother.isValid should be true', () => {
//       const bigBrother = new BigBrother();

//       bigBrother.registerComponents([
//         { id: 'name', isRequired: true, value: '', isVisible: true, isDisabled: true }
//       ]);

//       expect(bigBrother.isValid()).toBeTruthy();
//     })
//   });


//   describe('When value AND isRequired AND isVisible AND !isDisabled', () => {
//     it('bigBrother.isValid should be true', () => {
//       const bigBrother = new BigBrother();

//       bigBrother.registerComponents([
//         { id: 'name', isRequired: true, value: 'something', isVisible: true, isDisabled: false }
//       ]);

//       expect(bigBrother.isValid()).toBeTruthy();
//     })
//   });


//   describe('When whitespace entered for value AND isRequired AND isVisible AND !isDisabled', () => {
//     it('bigBrother.isValid should be false', () => {
//       const bigBrother = new BigBrother();

//       bigBrother.registerComponents([
//         { id: 'name', isRequired: true, value: '   ', isVisible: true, isDisabled: false }
//       ]);

//       expect(bigBrother.isValid()).toBeFalsy();
//     })
//   });


//   describe('When isVisible is false AND isDisabled is true AND isRequired AND !value', () => {
//     it('bigBrother.isValid should be true', () => {
//       const bigBrother = new BigBrother();

//       bigBrother.registerComponents([
//         { id: 'name', isRequired: true, value: '', isVisible: false, isDisabled: true }
//       ]);

//       expect(bigBrother.isValid()).toBeTruthy();
//     })
//   });


//   describe('When isVisible is false AND isDisabled is true AND isRequired AND value', () => {
//     it('bigBrother.isValid should be true', () => {
//       const bigBrother = new BigBrother();

//       bigBrother.registerComponents([
//         { id: 'name', isRequired: true, value: 'something', isVisible: false, isDisabled: true }
//       ]);

//       expect(bigBrother.isValid()).toBeTruthy();
//     })
//   });


//   describe('When isVisible is false AND isDisabled is true AND !isRequired AND value', () => {
//     it('bigBrother.isValid should be true', () => {
//       const bigBrother = new BigBrother();

//       bigBrother.registerComponents([
//         { id: 'name', isRequired: false, value: 'something', isVisible: false, isDisabled: true }
//       ]);

//       expect(bigBrother.isValid()).toBeTruthy();
//     })
//   });


//   describe('When isVisible is false AND isDisabled is true AND !isRequired AND !value', () => {
//     it('bigBrother.isValid should be true', () => {
//       const bigBrother = new BigBrother();

//       bigBrother.registerComponents([
//         { id: 'name', isRequired: false, value: '', isVisible: false, isDisabled: true }
//       ]);

//       expect(bigBrother.isValid()).toBeTruthy();
//     })
//   });


//   describe('When isVisible is true AND isDisabled is true AND !isRequired AND !value', () => {
//     it('bigBrother.isValid should be true', () => {
//       const bigBrother = new BigBrother();

//       bigBrother.registerComponents([
//         { id: 'name', isRequired: false, value: '', isVisible: true, isDisabled: true }
//       ]);

//       expect(bigBrother.isValid()).toBeTruthy();
//     })
//   });


//   describe('When isVisible is false AND isDisabled is false AND !isRequired AND !value', () => {
//     it('bigBrother.isValid should be true', () => {
//       const bigBrother = new BigBrother();

//       bigBrother.registerComponents([
//         { id: 'name', isRequired: false, value: '', isVisible: false, isDisabled: false }
//       ]);

//       expect(bigBrother.isValid()).toBeTruthy();
//     })
//   });


//   describe('When isVisible is false AND isDisabled is false AND !isRequired AND value', () => {
//     it('bigBrother.isValid should be true', () => {
//       const bigBrother = new BigBrother();

//       bigBrother.registerComponents([
//         { id: 'name', isRequired: false, value: 'something', isVisible: false, isDisabled: false }
//       ]);

//       expect(bigBrother.isValid()).toBeTruthy();
//     })
//   });


//   describe('When isVisible is false AND isDisabled is false AND isRequired AND value', () => {
//     it('bigBrother.isValid should be true', () => {
//       const bigBrother = new BigBrother();

//       bigBrother.registerComponents([
//         { id: 'name', isRequired: true, value: 'something', isVisible: false, isDisabled: false }
//       ]);

//       expect(bigBrother.isValid()).toBeTruthy();
//     })
//   });


//   describe('When isVisible is false AND isDisabled AND isRequired AND value', () => {
//     it('bigBrother.isValid should be false', () => {
//       const bigBrother = new BigBrother();

//       bigBrother.registerComponents([
//         { id: 'name', isRequired: true, value: '', isVisible: true, isDisabled: false }
//       ]);

//       expect(bigBrother.isValid()).toBeFalsy();
//     })
//   });


//   describe('When isVisible AND !isDisabled AND !isRequired AND value', () => {
//     it('bigBrother.isValid should be true', () => {
//       const bigBrother = new BigBrother();

//       bigBrother.registerComponents([
//         { id: 'name', isRequired: false, value: 'a', isVisible: true, isDisabled: false }
//       ]);

//       expect(bigBrother.isValid()).toBeTruthy();
//     })
//   });


//   describe('When !isRequired AND value AND isVisible AND isDisabled', () => {
//     it('bigBrother.isValid should be true', () => {
//       const bigBrother = new BigBrother();

//       bigBrother.registerComponents([
//         { id: 'name', isRequired: false, value: 'a', isVisible: true, isDisabled: true }
//       ]);

//       expect(bigBrother.isValid()).toBeTruthy();
//     })
//   });
// });


// describe('Given setValidity has been called', () => {
//   describe('When ', () => {
//     it('should do something', () => {
//       const bigBrother = new BigBrother();

//       bigBrother.registerComponents([
//         { id: 'name', isRequired: true, value: '', isVisible: true, isDisabled: false }
//       ]);

//       bigBrother.setValidity(true, 'name', true, true, true, false, 'something', null, null)

//       expect(bigBrother.isValid()).toBeTruthy();
//     });
//   });


//   describe('When something else', () => {
//     it('should do something else', () => {
//       const bigBrother = new BigBrother();
//       let isFormValid = false;

//       bigBrother.registerComponents([
//         { id: 'name', isRequired: true, value: '', isVisible: true, isDisabled: false }
//       ]);


//       bigBrother.setValidity(true, 'name', true, true, true, false, 'something', () => { isFormValid = true }, () => { isFormValid = false });

//       expect(isFormValid).toBeTruthy();
//     });
//   });


//   describe('When something else 2', () => {
//     it('should do something else 2', () => {
//       const bigBrother = new BigBrother();
//       let isFormValid = true;

//       bigBrother.registerComponents([
//         { id: 'name', isRequired: true, value: '', isVisible: true, isDisabled: false }
//       ]);


//       bigBrother.setValidity(true, 'name', true, false, true, false, '', () => { isFormValid = true }, () => { isFormValid = false });

//       expect(isFormValid).toBeTruthy();
//     });
//   });
// })


// More to come!