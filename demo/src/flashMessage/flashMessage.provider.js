import React, { useState } from 'react';

export const FlashMessageContext = React.createContext();

export const FlashMessageProvider = props => {
  const [messageType, setMessageType] = useState(props.messageType || ''); 
  const [messageText, setMessageText] = useState(props.messageText || ''); 

  return(
    <FlashMessageContext.Provider value={{
        state: {
          messageType: messageType,
          messageText: messageText
        },
        actions: {
          showMessage: handleShowMessage
        }
    }}>
      <FlashMessageContext.Consumer>
        {(context) => {
          return props.children(context);
        }}
      </FlashMessageContext.Consumer>
    </FlashMessageContext.Provider>
  );


  function handleShowMessage(messageType, messageText){
    setMessageType(messageType);
    setMessageText(messageText);
  }
}