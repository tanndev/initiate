import React from 'react';
import '../styles/App.css';

import Header from './Header';
import Chat from './Chat';

export default function App() {
  return (
    <div className="App">
      <Header />
      <div className="App-home">
        <p>
          Visit our <a href="https://github.com/tanndev/initiate">Github</a> to see our roadmap, keep up to date on
          our
          progress, or contribute!
        </p>
        <Chat />
      </div>
    </div>
  );
}
