import React from 'react';
import { FlashMessageContext } from '.';

export const withFlashMessageContext = Component => props => (
  <FlashMessageContext.Consumer>
    {state => <Component {...props} flashMessageContext={state} />}
  </FlashMessageContext.Consumer>
);