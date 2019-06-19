import React, { useEffect, useState } from 'react';

import socket from '../socket-io';

import '../styles/Header.css';

export default function Header() {
    const [connected, setConnected] = useState(false);

    // Monitor the connection to the socket.
    useEffect(() => {
        socket.on("connect", () => {
            setConnected(true);
        });

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

    return (
        <header className="Header">
            <h2 className="Header-title">
                Initiate
            </h2>
            {connected
             ? (
                 <div className="Navbar">
                     <div className="Navbar-button" onClick={newCombat}>
                         New Combat
                     </div>
                     <div className="Navbar-button" onClick={joinCombat}>
                         Join Combat
                     </div>
                 </div>
             )
             : (
                 <div className="Navbar-reconnecting">Reconnecting...</div>
             )
            }

        </header>
    );
}
