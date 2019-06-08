import React, {useState} from 'react';

export default function ChatInput({sendMessage}) {
  const [chatInput, setChatInput] = useState('');

  function submitHandler(event) {
    // Stop the form from refreshing the page on submit
    event.preventDefault();

    // Clear the input box
    setChatInput('');

    // Call the sendMessage callback with the chatInput message
    sendMessage(chatInput);
  }

  function textChangeHandler(event) {
    setChatInput(event.target.value);
  }


  return (
    <form className="chat-input" onSubmit={submitHandler}>
      <input type="text"
             onChange={textChangeHandler}
             value={chatInput}
             placeholder="Write a message..."
             required/>
    </form>
  );
}
