import React, {useEffect, useState} from 'react';

export default function ChatMessages({messages}) {

  const displayedMessages = messages.map(message => {
    return (
      <li className={message.mine ? 'Message Message-Mine' : 'Message'}>
        <div className="Message-sender">{message.sender}</div>
        <div className="Message-content">{message.text}</div>
      </li>
    )
  });

  return (
    <ul className="ChatMessages">
      {displayedMessages}
    </ul>
  )
}
