import React from 'react';

import '../styles/App.css';

import Header from './Header';
import Combat from './Combat';

export default function App() {
    return (
        <div className="App">
            <Header/>
            <div className="App-home">
                <p>
                    Visit our <a href="https://github.com/tanndev/initiate">Github</a> to see our roadmap,
                    keep up to date on our progress, or contribute!
                </p>
                <Combat/>
            </div>
            {/*<footer>*/}
            {/*    <p>{connected ? 'Connected!' : 'Disconnected :('}</p>*/}
            {/*</footer>*/}
        </div>
    );
}
