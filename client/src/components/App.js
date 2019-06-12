import React, { useEffect, useState } from 'react';
import socketIOClient from "socket.io-client";

import '../styles/App.css';

import Header from './Header';
import Combat from './Combat';

export default function App() {
    const [connected, setConnected] = useState(false);

    // As an effect, connect to the default Socket.IO namespace and monitor the connection.
    useEffect(() => {
        const socket = socketIOClient();

        socket.on("connect", () => {
            console.log(`Connected to default namespace as ${socket.id}.`);
            setConnected(true);
        });

        socket.on("disconnect", () => {
            console.log(`Disconnected from default namespace.`);
            setConnected(false);
        });
    }, []);

    // Render the app.
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
            <footer>
                <p>{connected ? 'Connected!' : 'Disconnected :('}</p>
            </footer>
        </div>
    );
}
