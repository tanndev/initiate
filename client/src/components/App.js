import React, { useEffect, useState } from 'react';
import socketIOClient from "socket.io-client";

import '../styles/App.css';

import Header from './Header';
import Combat from './Combat';

export default function App() {
    const [socket, setSocket] = useState(null);
    const [connected, setConnected] = useState(false);
    const [combat, setCombat] = useState(false);

    // As an effect, connect to the default Socket.IO namespace and monitor the connection.
    useEffect(() => {
        const socket = socketIOClient();
        setSocket(socket);

        socket.on("connect", () => {
            console.log(`Connected as ${socket.id}.`);
            setConnected(true);
        });

        socket.on("disconnect", () => {
            console.log(`Disconnected from default namespace.`);
            setConnected(false);
        });

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

    // Render the app.
    return (
        <div className="App">
            <Header newCombat={newCombat} joinCombat={joinCombat}/>
            <div className="App-home">
                <p>
                    Visit our <a href="https://github.com/tanndev/initiate">Github</a> to see our roadmap,
                    keep up to date on our progress, or contribute!
                </p>
                <Combat combat={combat}/>
            </div>
            <footer>
                <p>{connected ? 'Connected!' : 'Disconnected :('}</p>
            </footer>
        </div>
    );
}
