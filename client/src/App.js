import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
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
          Visit our <a href="https://github.com/tanndev/initiate">Github</a> to see our roadmap, keep up to date on our
          progress, or contribute!
        </p>
      </header>
    </div>
  );
}

export default App;
