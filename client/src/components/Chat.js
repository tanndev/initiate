import React, {useEffect, useState} from 'react';
import socketIOClient from "socket.io-client";

import '../styles/Chat.css';

import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

export default function Chat() {
  const [socket, setSocket] = useState(null);
  const [clientId, setClientId] = useState(null);
  const [name, setName] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const socket = socketIOClient();
    setSocket(socket);

    socket.on("Welcome", data => {
      const {clientId} = data;
      console.log(`Got assigned clientid ${clientId}`);
      setClientId(clientId);
    });

    socket.on("Message", message => {
      console.log('Received message:', message);
      showMessage(message);
    });

    socket.on("disconnect", () => {
      console.log(`Disconnected.`);
      setClientId(null);
    });
  }, []);

  function handleNameChange(event){
    setName(event.target.value);
  }

  function sendMessage(text) {
    const message = {sender: name || clientId, text, mine:true};
    socket.emit("Message", message);
    showMessage(message)
  }

  function showMessage(message) {
    setMessages(messages => messages.concat(message));
  }

  return (
    <div className="Chat">
      <p>
        You are {clientId ? `connected as ${clientId}` : 'not connected'}.
      </p>
      <input
        className="Chat-name"
        onChange={handleNameChange}
        value={name}
        type="text"
        placeholder="Set a custom name..."
      />
      <ChatMessages messages={messages}/>
      <ChatInput sendMessage={sendMessage}/>
    </div>
  );
}
