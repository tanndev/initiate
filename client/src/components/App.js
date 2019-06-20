import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import socketIOClient from 'socket.io-client';

import '../styles/App.css';

import Header from './Header';
import Combat from './Combat';

export default function App() {
    const [socket, setSocket] = useState(null);
    const [connected, setConnected] = useState(false);
    const [combat, setCombat] = useState(null);

    // Monitor the socket for combat commands.
    useEffect(() => {
        const socket = socketIOClient();
        setSocket(socket);

        // Handle connections
        socket.on("connect", () => {
            setConnected(true);
        });

        // Handle disconnections.
        socket.on("disconnect", () => {
            setConnected(false);
        });

        // Monitor for combat commands.
        socket.on("update combat", combat => {
            console.log('Received new combat:', combat);
            setCombat(combat);
        });

    }, []);

    function newCombat() {
        if (connected) socket.emit('create combat');
        else alert("Can't create a combat right now.");
    }

    function joinCombat() {
        if (connected) alert("This button doesn't work yet.");
        else alert("Can't join a combat right now.");
    }

    const greeting = () => (
        <p>
            Visit our <a href="https://github.com/tanndev/initiate">Github</a> to see our roadmap,
            keep up to date on our progress, or contribute!
        </p>
    );

    return (
        <Router>
            <div className="App">
                <Header connected={connected} newCombat={newCombat} joinCombat={joinCombat}/>
                <div className="App-content">
                    <Route exact path='/' render={greeting}/>
                    <Route path='/combat/:id?' render={props => <Combat {...props} combat={combat}/> }/>
                </div>
                <footer>
                    <p>{connected ? 'Connected!' : 'Disconnected :('}</p>
                </footer>
            </div>
        </Router>
    );
}
