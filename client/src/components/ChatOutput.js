import React, {useEffect} from 'react';

export default function ChatOutput({messages}) {

  useEffect(() => {
    // Scroll with the messages.
    const objDiv = document.getElementById('messageList');
    objDiv.scrollTop = objDiv.scrollHeight;
  });

  const messageList = messages.map((messageEntry, index) => {
    const {clientId, message} = messageEntry;
    return (
      <div className={`message`} key={index}>
        <div className='username'>
          {clientId}
        </div>
        <div className='message-body'>
          {message}
        </div>
      </div>
    );
  });

  return (
    <div className='messages' id='messageList'>
      {messageList}
    </div>
  );
}
