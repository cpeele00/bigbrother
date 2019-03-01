import React from 'react';
import Login from './login';
import { FlashMessage, FlashMessageProvider } from './flashMessage';


const App = props => (
  <FlashMessageProvider>
    {flashContext => (
      <React.Fragment>
        <FlashMessage
          messageType={flashContext.state.messageType}
          messageText={flashContext.state.messageText} />
        <Login {...props} />
      </React.Fragment>
    )}
  </FlashMessageProvider>
);


export default App;
