import React, {Component} from 'react';
import socketIOClient from "socket.io-client";
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      clientId: null,
      endpoint: "http://localhost:3001"
    };
  }

  componentDidMount() {
    const {endpoint} = this.state;
    const socket = socketIOClient(endpoint);

    socket.on("ClientId", data => {
      const {clientId} = data;
      console.log(`Got assigned clientid ${clientId}`);
      this.setState({clientId});
    });

    socket.on("Random", data => {
      const {clientId, random} = data;
      console.log(`Got random number ${random} for client ${clientId}`);
      this.setState({clientId, random});
    });

    socket.on("disconnect", () => {
      console.log(`Disconnected.`);
      this.setState({clientId: null});
    });
  }

  render() {
    const {clientId, random} = this.state;
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
          {random
           ? <p>The last random value was {random}</p>
           : <p>No data received yet.</p>}
        </header>
      </div>
    );
  }
}

export default App;
