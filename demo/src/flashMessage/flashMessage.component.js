import React from 'react';

export default ({messageType, messageText}) => {
  if (!messageType)
    return null;

  const headerText = messageType === 'success' ? 'Success' : 'Error';

  return (
    <div className={`flash-message ${messageType}`}>
      <span className="flash-message-header">{headerText}</span>
      <span className="flash-message-text">{messageText}</span>
    </div>
  );
};
