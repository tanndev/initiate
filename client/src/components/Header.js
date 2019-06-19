import React, { useEffect, useState } from 'react';

import socket from '../socket-io';

import '../styles/Header.css';

export default function Header() {
    const [connected, setConnected] = useState(false);

    // Monitor the connection to the socket.
    useEffect(() => {
        // Set the initial state when the page is loaded.
        setConnected(socket.connected);

        // Handle connections
        socket.on("connect", () => {
            setConnected(true);
        });

        // Handle disconnections.
        socket.on("disconnect", () => {
            setConnected(false);
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

    const navbarButtons = [
        <div className="Navbar-button" onClick={newCombat}> New Combat </div>,
        <div className="Navbar-button" onClick={joinCombat}> Join Combat </div>
    ];

    const navbarReconnecting = <div className="Navbar-reconnecting">Reconnecting...</div>;

    return (
        <header className="Header">
            <h2 className="Header-title">
                Initiate
            </h2>
            <div className="Navbar">
                {connected ? navbarButtons : navbarReconnecting}
            </div>
        </header>
    );
}
