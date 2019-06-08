import React, {useEffect, useState} from 'react';
import socketIOClient from "socket.io-client";
import logo from '../assets/logo.svg';
import '../styles/App.css';

export default function App() {
  const [socket, setSocket] = useState(null);
  const [clientId, setClientId] = useState(null);

  useEffect(() => {
    const socket = socketIOClient('http://localhost:3000');
    setSocket(socket);

    socket.on("Welcome", data => {
      const {clientId} = data;
      console.log(`Got assigned clientid ${clientId}`);
      setClientId(clientId);
    });

    socket.on("Message", messageEntry => {
      console.log('Received message:', messageEntry);
    });

    socket.on("disconnect", () => {
      console.log(`Disconnected.`);
      setClientId(null);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h2>
          Welcome to Initiate!
        </h2>
        <p>
          TannDev's Combat Initiative Tracker for Roleplaying Games
        </p>
        <img src={logo} className="App-logo" alt="logo"/>
        <p>
          Visit our <a href="https://github.com/tanndev/initiate">Github</a> to see our roadmap, keep up to date on
          our
          progress, or contribute!
        </p>
        <p>
          You are {clientId ? `connected as ${clientId}` : 'not connected'}.
        </p>
      </header>
    </div>
  );
}
