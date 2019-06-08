import React, {useState} from 'react';

export default function ChatMessages({sendMessage}) {
  const [text, setText] = useState('');

  function handleChange(event){
    setText(event.target.value);
  }

  function handleSubmit(event){
    event.preventDefault();
    setText('');
    sendMessage(text);
  }

  return (
    <div className="ChatInput">
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          value={text}
          type="text"
          placeholder="Enter your message and press ENTER"
          autoFocus={true}
        />
        <button>Send</button>
      </form>
    </div>
  )
}
